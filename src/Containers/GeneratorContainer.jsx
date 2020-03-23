import React, { useState } from 'react';
import PaletteGenerator from '../Components/PaletteGenerator';
import FileUpload from '../Components/FileUpload';
import Metrics from '../Components/Metrics';


const GeneratorContainer = (props) => {

    const [uploadedFile, setUploadedFile] = useState([]);
    const [numColors, setNumColors] = useState(6);
    const [currentPalette, setCurrentPalette] = useState({
        color1: {r: 255, b: 255, g: 255},
        color2: {r: 255, b: 255, g: 255},
        color3: {r: 255, b: 255, g: 255},
        color4: {r: 255, b: 255, g: 255},
        color5: {r: 255, b: 255, g: 255},
        color6: {r: 255, b: 255, g: 255}
    });

    const handleFileUpload = (uploadedFile) => {
        setUploadedFile(uploadedFile)
    }

    const handleAdjustColorNum = (e) => {
        if (e.target.className === "subtract-col" && numColors > 4) {
            setNumColors(numColors - 1);
        } else if (e.target.className === "add-col" && numColors < 6) {
            setNumColors(numColors + 1);
        }
    }

    return(
        <div className="generator-container">
            
            <div className="build-palette">
            <h2 className="generator-header">Build a Palette</h2>
            <p>You can upload an image, start from scratch, or a mix of the two.</p>
            <FileUpload 
                handleFileUpload={handleFileUpload}
            />
            <p className="num-colors-params">[min: 4]</p>
            <button className="subtract-col" onClick={handleAdjustColorNum}> - </button>
            <button className="add-col" onClick={handleAdjustColorNum}> + </button>
            <p className="num-colors-params">[max: 6]</p>
            <PaletteGenerator
                uploadedFile={uploadedFile}
                currentPalette={currentPalette}
                setCurrentPalette={setCurrentPalette}
                numColors={numColors}
            />
            </div>            
            <Metrics
                currentPalette={currentPalette}
            />
        </div>
    )
}

export default GeneratorContainer;