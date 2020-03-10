import React from 'react';
import p5 from 'p5';

class PaletteGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef(); // ref to canvas
    }


    // create p5 canvas
    componentDidMount() {
        this.myP5 = new p5 (this.sketch, this.myRef.current)
    }


    // p5 in instance mode
    sketch = (p) => {

        p.setup = () => {
            p.createCanvas(500, 500);
            p.background(255);
            p.drawACircle();
        }

        
        // loading screen
        p.drawACircle = () => {
            p.clear()
            p.background(255)
            p.circle(250,250,100)
        }

    
        // not using the draw function because we aren't animating anything
        p.draw = () => {
        }
    }
    
    render() {       
        return (
            <>
            <h2>The Palette Generator</h2>
            <p>Henlo! Soon I will be able to make pretty colors.</p>
            <div
                className="canvas-container"
                ref={this.myRef} // ref to html5 canvas
            />
            </>
        )
    }

} // end of PaletteGenerator class

export default PaletteGenerator;