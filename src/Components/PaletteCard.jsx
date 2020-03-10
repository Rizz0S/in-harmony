import React from 'react';

const PaletteCard = (props) => {

  if (props.context === "gallery") {

      return (
        <div className="palette-card" >
          <p>Hi, I'm a palette card!</p>
        </div>
      )
    

  } else if (props.context === "profile") {

      return (
       <div className="palette-card" >
          <p>Hi, I'm a palette card!</p>
        </div> 
      )
    }
}

export default PaletteCard;