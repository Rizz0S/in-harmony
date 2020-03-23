import React, {useState} from 'react';

export default function SavePaletteModal (props) {

    const [paletteName, setPaletteName] = useState("")

    const handleChangeInput = (e) => {
      setPaletteName(e.target.value)
    }
  
    const handleInitialSubmit = (e) => {
      e.preventDefault()
      props.persistPalette(paletteName)
      setPaletteName("")
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <form className="save-palette-form" onSubmit={handleInitialSubmit}>
                    <label htmlFor="name">Enter a name: </label> 
                        <input type="text" name="name" id="name" placeholder="name..." value={paletteName} onChange={handleChangeInput} />
                   
                    <input type="submit" value="Save" />
                 </form>
                <button className="close-save-palette-btn" onClick={props.handleModalClick}>X</button>
            </div>
        </div>
    )
}
