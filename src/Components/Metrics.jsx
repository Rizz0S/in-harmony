import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import debounceRender from 'react-debounce-render';
import chroma from 'chroma-js';
import SavePaletteModal from './SavePaletteModal';
import _ from 'lodash';


// ACCESSIBILITY METRICS

const findMinAndMaxContrast = (palette) => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    let results = {minContrast: [], maxContrast: []};

    for (let i = 0; i < palette.length; i++) {
        let currentContrast;
        let pass = false;
        for (let j = i + 1; j < palette.length; j++) {
            currentContrast = chroma.contrast(palette[i], palette[j])
            if (currentContrast > 4.5) {pass = true;}
            if (currentContrast < min) {
                min = currentContrast;
                results.minContrast = [currentContrast, palette[i], palette[j], pass]
            } else if (currentContrast > max) {
                max = currentContrast;
                results.maxContrast = [currentContrast, palette[i], palette[j], pass]
            }
        }
    }
    return results;
}

const compareHues = (palette) => {
    let problemPairings = [];

    for (let i = 0; i < palette.length; i++) {
        let currentContrast;
        for (let j = i + 1; j < palette.length; j++) {
            let temp = [];
            let hueA = chroma(palette[i]).hsl()[0];
            let hueB = chroma(palette[j]).hsl()[0];

            currentContrast = chroma.contrast(palette[i], palette[j])

            if (currentContrast < 3.1 && ((hueA - hueB > 25 || hueB - hueA > 25) || (hueA < 130 && hueB > 310))) {
                temp.push(palette[i], palette[j], currentContrast);
                problemPairings.push(temp)
            }
        }
    }

    return problemPairings;
}

const findOutOfRangeHues = (palette) =>{
    return palette.filter((color) => {
        let hue = chroma(color).hsl()[0];
        return (hue < 130 || hue > 310)
    })
}

const MetricsContent = (props) => {

    const {metrics, problemPairings, renderProblemParings} = props;

    return (
            <div className="metrics-content">
                <h3><i>Contrast Ratios</i></h3>
                <p>The minimum contrast ratio is: <b>{metrics.minContrast[0].toFixed(2)}</b></p>
                <div>
                    <div key={metrics.minContrast[0] + 1} className="metric-swatch" style={{backgroundColor: chroma(metrics.minContrast[1]).hex()}}/>
                    <div key={metrics.minContrast[0] + 2} className="metric-swatch" style={{backgroundColor: chroma(metrics.minContrast[2]).hex()}}/>
                </div>
                <div>
                    <div className="WCAG-is-compliant"><i className="material-icons help-icon">help_outline</i>
                        <div className="WCAG-info">To be compliant with WCAG guidelines, the contrast ratio must be at least <b>4.5</b>.</div>
                    </div>
                    WCAG compliant: {metrics.minContrast[3] ? "✓" : "✕" }
                </div>
                <p>The maximum ratio contrast ratio is: <b>{metrics.maxContrast[0].toFixed(2)}</b></p>
                <div>
                    <div key={metrics.maxContrast[0] + 1} className="metric-swatch" style={{backgroundColor: chroma(metrics.maxContrast[1]).hex()}}/>
                    <div key={metrics.maxContrast[0] + 2} className="metric-swatch" style={{backgroundColor: chroma(metrics.maxContrast[2]).hex()}}/>
                </div>
                <div>
                    <div className="WCAG-is-compliant"><i className="material-icons help-icon">help_outline</i>
                        <div className="WCAG-info">To be compliant with WCAG guidelines, the contrast ratio must be at least <b>4.5</b>.</div>
                    </div>
                    WCAG compliant:  {metrics.maxContrast[3] ? "✓" : "✕" }
                </div>
                <h3><i>Color Blindness</i></h3>
                {problemPairings.length > 0 ? 
                    <>
                    <p>Vulnerabilities:</p>
                    <p style={{fontSize: 13, fontStyle:"italic"}}>See about page for more details.</p>
                    <div className="problem-pairing-container">
                    {renderProblemParings(problemPairings)}
                    </div>
                    </>
                :
                    <p className="problem-pairing-container">Your palette is currently colorblind accessible. :^}</p>
                }
        </div>
    )
}

const DebounceMetricsContent = debounceRender(MetricsContent, 1000);

const Metrics = (props) => {

    const dispatch = useDispatch();
    const token = useSelector( (state) => state.userInfo.token);

    // conditional rendering state for pop up modal
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    let metrics = {
        minContrast: [],
        maxContrast: []
    };

    let {currentPalette, numColors} = props;

    const paletteArr = Object.values(currentPalette).slice(0, numColors);

    metrics = findMinAndMaxContrast(paletteArr);

    const hues = findOutOfRangeHues(paletteArr);

    const problemPairings = compareHues(hues);

    const renderProblemParings = (problemPairings) => {
        return problemPairings.map((pairing, idx) => {
            return <div className="problem-pairing">
                <div key={pairing[2] + '1'} className="metric-swatch" style={{backgroundColor: chroma(pairing[0]).hex()}}/>
                <div key={pairing[2] + '2'} className="metric-swatch" style={{backgroundColor: chroma(pairing[1]).hex()}}/>
                <p key={pairing[2] + '3'}>Contrast ratio: {pairing[2].toFixed(2)}</p>
            </div>
        })
    }

    useEffect(() => {
        const handleLoading = (status) =>{
            setLoading(status);
        }

        setTimeout(() => {handleLoading(false)}, 3000)

        return function cleanup() {
            handleLoading(true);
        }
    }, [setLoading, currentPalette])
    
    const handleModalClick = () => {
        setShowModal(!showModal)
    }

    const persistPalette = (paletteName) => {
        let hexArr = _.map(currentPalette, (swatchColor) => {
           return chroma(swatchColor).hex()
        })

        hexArr = hexArr.slice(0, numColors)
        const isColorblindAccessible = problemPairings.length === 0;
        const max_contrast = metrics.maxContrast[0].toFixed(2);

        fetch('https://in-harmony.herokuapp.com/palettes', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: paletteName,
                colors: hexArr,
                colorblind_accessible: isColorblindAccessible,
                max_contrast: max_contrast
            })
        })
        .then(r => r.json())
        .then(resp => {
            if (resp.message) {
                alert(resp.message)
            } else {
                dispatch(addPalette(resp))
                dispatch(addUserPalette(resp))
            }
        })
        setShowModal(false);
    }

    return (
            <div className="metrics-container">
                <h2 className="generator-header">Metrics</h2>
                <div className="metrics-fade-in-wrapper">
                    <DebounceMetricsContent 
                        metrics={metrics}
                        problemPairings={problemPairings}
                        renderProblemParings={renderProblemParings}
                    />
                    <div className={loading ? "loading-logo-wrapper in" : "loading-logo-wrapper"}>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="loading metrics" className="loading-logo"></img>
                    </div>
                </div>
                <button className = "save-palette-btn" onClick={handleModalClick}> <i className="material-icons-outlined save-icon">save</i>Save to Gallery</button>
                {showModal ? 
                    <SavePaletteModal 
                        handleModalClick={handleModalClick}
                        persistPalette={persistPalette}
                /> :
                null
                }       
            </div>
    )    
}

const addPalette = (palette) => {
    return {
      type: "ADD_PALETTE",
      payload: palette
    }
}

const addUserPalette = (palette) => {
    return {
      type: "ADD_USER_PALETTE",
      payload: palette
    }
}

export default debounceRender(Metrics, 500)

// export default Metrics;