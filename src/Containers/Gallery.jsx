import React from 'react';
import PaletteCard from '../Components/PaletteCard';
import {connect} from 'react-redux'

const Gallery = (props) => {
    const renderPaletteCards = () => {
      return props.palettes.map((palette) => {
        return <PaletteCard
          key={palette.id}
          palette={palette}
          context="gallery"
          />
      })
    }
    
      return (
        <>
        <h3>Welcome to the gallery. Browse around.</h3>
        <div className="palette-card-container" >
          {renderPaletteCards()}
        </div>
        </>
      )
}

const mapStateToProps = (state) => {
  return {
    palettes: state.palettesInfo.all
  }
}

export default connect(mapStateToProps)(Gallery);