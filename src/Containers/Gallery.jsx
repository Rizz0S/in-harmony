import React, {useState} from 'react';
import PaletteCard from '../Components/PaletteCard';
import {useSelector} from 'react-redux'

const Gallery = (props) => {


  const [filterColorblindAccessible, setFilterColorblindAccessible] = useState(false);
  const [sortPopular, setSortPopular] = useState(false);
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const allPalettes = useSelector( (state) => state.palettesInfo.all);

  const renderPaletteCards = (palettesArr) => {
    let palettesToRender = palettesArr.slice()

    if (filterSearchTerm) {
      palettesToRender = palettesToRender.filter((palette) => {
        if (palette.name.includes(filterSearchTerm) || palette.username.includes(filterSearchTerm)) {
          return palette;
        }
      })
    }

    if (sortPopular) {
      palettesToRender = palettesToRender.sort((palette1, palette2) => palette2.num_likes - palette1.num_likes)
    }

    return palettesToRender.map((palette) => {
      return <PaletteCard
        key={palette.id}
        palette={palette}
        context="showCreator"
        />
    })
  }
  
  const handleFilterColorblind = () => {
    setFilterColorblindAccessible(!filterColorblindAccessible);
  }

  const handleSortPopular = () => {
    setSortPopular(!sortPopular);
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

      <label htmlFor="sort-popular" className="filter-condition">Sort by Most Popular:</label>
      <input 
        name="sort-popular"
        id="sort-popular"
        
        type="checkbox" 
        checked={sortPopular}
        onChange={handleSortPopular}
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