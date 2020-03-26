import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import ReactCardFlip from 'react-card-flip';


const PaletteCard = (props) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();

  const {name, color_hexes, colorblind_accessible, num_likes, id, username} = props.palette;
  const max_contrast = parseFloat(props.palette.max_contrast);
  
  const user = useSelector( (state) => state.userInfo.user)
  const token = useSelector( (state) => state.userInfo.token)

  const liked = user.liked_palettes.find((liked_palette) => props.palette.id === liked_palette.id)
  const [cardFlipped, setCardFlipped] = useState(false);

  const renderCardSwatches = () => {
    return color_hexes.map((color, idx) => {
      return <div 
        className="card-swatch"
        key={color + idx}
        style={{backgroundColor: color}}
       />
    })
  }

  const renderColorHexes = () => {
    return color_hexes.map((color, idx) => {
      return <div
        className="card-hex-background"
        key={color + idx}
        style={{backgroundColor: color}}
        >
          <div className="card-hex">{color.toUpperCase()}</div>
       </div>
    })
  }

  const handleLike = () => {

    if (!liked) {
      fetch(`http://localhost:4000/like`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({id: id})
      })
        .then(r => r.json())
        .then((resp) => {
          if (resp.message) {
            alert.show(resp.message)
        } else {
          dispatch(likePalette(resp))
          dispatch(updatePaletteLikes(resp, 1))
        }
        })
    } else {
      fetch(`http://localhost:4000/unlike`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({id: id})
      })
        .then(r => r.json())
        .then((resp) => {
          if (resp.message) {
            alert.show(resp.message)
        } else {
          dispatch(unlikePalette(resp))
          dispatch(updatePaletteLikes(resp, -1))
        }
        })
    }
  }

  const handleCardFlip = () => {
    setCardFlipped(!cardFlipped);
  }



  return (
    <ReactCardFlip 
      containerStyle={{margin: "10px auto", height: 230}}
      isFlipped={cardFlipped} 
      flipDirection="vertical" 
      flipSpeedBackToFront={0.8}
      flipSpeedBackToBack={0.8}
      infinite={true}
    >

      <div className="palette-card-front" style={{animationDelay: `${props.idx * 0.1}s`}}>
        <div className="card-swatch-wrapper">
          <p style={{position: "absolute", transform: "translate(-50%, -100%)", left: "50%", marginTop: -20, fontSize: 18}}>{name}</p>
          {renderCardSwatches()}
          {props.context === "showCreator" ? <p className="card-details" style={{fontStyle: "italic"}}>creator: <b>{username}</b></p> : null}
        </div>
         <i className="material-icons flip-card" onClick={handleCardFlip}>flip_to_back</i>
        <div className="like-button" onClick={handleLike}> {liked ? "♥" : "♡" } </div>
      </div>

      <div className="palette-card-back">
        {renderColorHexes()}
        <p className="card-details metric-details">Colorblind Accessible: {colorblind_accessible ? "✓" : "✕"}</p>
        <p className="card-details metric-details">WCAG Compliant: {max_contrast >= 4.5 ? "✓" : "✕"}</p>
        <p className="card-details">♥'s: <span style={{fontFamily: "'Roboto Mono', monospace"}}>{num_likes}</span></p>
        <i className="material-icons flip-card" onClick={handleCardFlip}>flip_to_front</i>
        <div className="like-button" onClick={handleLike}> {liked ? "♥" : "♡" } </div>
      </div>

    </ReactCardFlip>
  )

}
const likePalette = (palette) => {
  return {
    type: "LIKE_PALETTE",
    payload: palette
  }
}

const unlikePalette = (palette) => {
  return {
    type: "UNLIKE_PALETTE",
    payload: palette
  }
}

const updatePaletteLikes = (palette, num) => {
  return {
    type: "UPDATE_LIKES",
    payload: {palette: palette, num: num}
  }
}



export default PaletteCard;