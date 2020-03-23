import React, { useEffect, useState } from 'react';
import debounceRender from 'react-debounce-render';
import chroma from 'chroma-js';


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

 function Metrics (props) {

    const [loading, setLoading] = useState(true);
    
    let metrics = {
        minContrast: [],
        maxContrast: []
    };

    const paletteArr = Object.values(props.currentPalette);

    metrics = findMinAndMaxContrast(paletteArr);

    const hues = findOutOfRangeHues(paletteArr);

    const problemPairings = compareHues(hues);

    const renderProblemParings = (problemPairings) => {
        return problemPairings.map((pairing) => {
            return <div className="problem-pairing">
                <div key={pairing[0]} className="card-swatch" style={{backgroundColor: chroma(pairing[0]).hex()}}/>
                <div key={pairing[1]} className="card-swatch" style={{backgroundColor: chroma(pairing[1]).hex()}}/>
                <p>Contrast ratio: {pairing[2].toFixed(2)}</p>
            </div>
        })
    }

    useEffect(() => {
        setTimeout(() => {setLoading(false)}, 1500)
    }, [setLoading])

    return (
            <div className="metrics-container">
                <h2 className="generator-header">Metrics</h2>
                <h3><i>Contrast Ratios</i></h3>
                <p>The minimum contrast ratio is: <b>{metrics.minContrast[0].toFixed(2)}</b></p>
                <div>
                    <div key={metrics.minContrast[0] + 1} className="card-swatch" style={{backgroundColor: chroma(metrics.minContrast[1]).hex()}}/>
                    <div key={metrics.minContrast[0] + 2} className="card-swatch" style={{backgroundColor: chroma(metrics.minContrast[2]).hex()}}/>
                </div>
                <p><div className="WCAG-is-compliant"><i className="material-icons help-icon">help_outline</i><div className="WCAG-info">It must be at least 4.5</div></div>WCAG compliant: {metrics.minContrast[3] ? "✓" : "✕" }</p>
                <p>The maximum ratio contrast ratio is: <b>{metrics.maxContrast[0].toFixed(2)}</b></p>
                <div>
                    <div key={metrics.maxContrast[0] + 1} className="card-swatch" style={{backgroundColor: chroma(metrics.maxContrast[1]).hex()}}/>
                    <div key={metrics.maxContrast[0] + 2} className="card-swatch" style={{backgroundColor: chroma(metrics.maxContrast[2]).hex()}}/>
                </div>
                <p><div className="WCAG-is-compliant"><i className="material-icons help-icon">help_outline</i><div className="WCAG-info">It must be at least 4.5</div></div>WCAG compliant:  {metrics.maxContrast[3] ? "✓" : "✕" }</p>
                <h3><i>Color Blindness</i></h3>
                {problemPairings.length > 0 ? 
                    <>
                    <p>Vulnerabilities:</p>
                    <div className="problem-pairing-container">
                    {renderProblemParings(problemPairings)}
                    </div>
                    </>
                :
                    <p>Your palette is currently color-blind accessible. :^}</p>
                }

            </div>
    )    
}

export default debounceRender(Metrics, 1500)