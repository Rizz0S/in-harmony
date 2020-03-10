import React, { useState } from 'react';
import PaletteGenerator from '../Components/PaletteGenerator';
import FileUpload from '../Components/FileUpload';



const GeneratorContainer = (props) => {

    return(
        <div>
            <PaletteGenerator />
            <FileUpload />
        </div>
    )
}

export default GeneratorContainer;