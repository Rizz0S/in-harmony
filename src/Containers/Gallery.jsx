import React, {useState} from 'react';
import PaletteCard from '../Components/PaletteCard';
import {useSelector} from 'react-redux'

const Gallery = (props) => {


  const [filterColorblindAccessible, setFilterColorblindAccessible] = useState(false);
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const allPalettes = useSelector( (state) => state.palettesInfo.all);

  const renderPaletteCards = (palettesArr) => {
    if (filterSearchTerm) {
      palettesArr = palettesArr.filter((palette) => {
        if (palette.name.includes(filterSearchTerm) || palette.username.includes(filterSearchTerm)) {
          return palette;
        }
      })
    }

    return palettesArr.map((palette) => {
      return <PaletteCard
        key={palette.id}
        palette={palette}
        context="gallery"
        />
    })
  }
  
  const handleFilterColorblind = () => {
    setFilterColorblindAccessible(!filterColorblindAccessible);
  }

  const handleFilterSearchTerm = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterSearchTerm(searchTerm);
  }
  return (
    <>
    <h3>Welcome to the gallery. Browse around.</h3>
    <div className="filter-bar">
      <label htmlFor="filter-colorblind" className="filter-condition">Colorblind Accessible:</label>
      <input 
        name="filter-colorblind"
        id="filter-colorblind"
        
        type="checkbox" 
        checked={filterColorblindAccessible}
        onChange={handleFilterColorblind}
        />
      <label htmlFor="filter-search-term" className="filter-condition">Search:</label>
      <input 
        name="filter-search-term"
        id="filter-search-term"
        type="text" 
        checked={filterSearchTerm}
        onChange={handleFilterSearchTerm}
        />
    </div>
    <div className="palette-card-container" >
      {filterColorblindAccessible ? renderPaletteCards(allPalettes.filter((palette) => palette.colorblind_accessible)) : renderPaletteCards(allPalettes)}
    </div>
    </>
  )
}

export default Gallery;