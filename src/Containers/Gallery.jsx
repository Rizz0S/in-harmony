import React from 'react';
import PaletteCard from '../Components/PaletteCard';

const Gallery = (props) => {

    const renderPaletteCards = () => {
        const arrOfPaletteCards = []
    
        for (let i = 0; i < 4; i++) {
          arrOfPaletteCards.push(<PaletteCard 
            context="gallery"
          />)
        }
    
        return arrOfPaletteCards;
      }
    
      return (
        <div className="palette-card-container" >
          {renderPaletteCards()}
        </div>
      )
}

export default Gallery;