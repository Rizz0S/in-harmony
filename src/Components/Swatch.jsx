import React, { useState } from 'react';
import chroma from 'chroma-js';
import iro from '@jaames/iro';


class ColorPicker extends React.Component {

    colorPicker = React.createRef();

    componentDidMount() { 
        this.wheelPicker = new iro.ColorPicker(this.colorPicker.current, {
            width: 125,
            color: this.props.currentSwatchColor,
            borderWidth: 1,
            borderColor: "#fff",
            sliderSize: 10
          });
        
        this.wheelPicker.on('color:change', this.colorChangeCB )
    }
    
    componentWillUnmount() {
        this.wheelPicker.off('color:change', this.colorChangeCB)
    }
        
    handleCloseColorPicker = (e) => {
        e.stopPropagation();
        this.props.setShowPicker(false)
    }

    colorChangeCB = () => { this.props.onColorChange(this.wheelPicker.color.rgb) }

    render() {

        return(
            <div className="color-picker-wrapper">
                <div ref={this.colorPicker} />
                <button className="close-picker-btn" onClick={this.handleCloseColorPicker}>X</button>
            </div>
        )

    }
}

export default function Swatch  (props) {

    let {id, color, changeSwatchColor, loading} = props

    const [showPicker, setShowPicker] = useState(false)

    const handleSwatchClick = () => {
        setShowPicker(true);
    }

    const onColorChange = (color) =>{
        changeSwatchColor(color, id)
    }

    return(
        <div className="swatch-color-container">
            <div 
                className="swatch-color"
                key={loading + id}
                id={props.id}
                style={{backgroundColor: color}}
                onClick={handleSwatchClick}>
                {showPicker ? 
                    <ColorPicker 
                        currentSwatchColor={color}
                        onColorChange={onColorChange}
                        setShowPicker={setShowPicker}
                    /> :
                    null
                }
                {loading ?
                    <i className="material-icons swatch-load-icon">hourglass_empty</i>
                    :
                    null
                }
            </div>
            <p>{chroma(color).hex().toUpperCase()}</p>
        </div>
    )
}
