import React from 'react';
import {useSelector, useDispatch} from 'react-redux';


const PaletteCard = (props) => {
  
  const dispatch = useDispatch();

  const {name, color_hexes, id, username} = props.palette;
  
  const user = useSelector( (state) => state.userInfo.user)
  const token = useSelector( (state) => state.userInfo.token)

  const liked = user.liked_palettes.find((liked_palette) => props.palette.id === liked_palette.id)

  const renderCardSwatches = () => {
    return color_hexes.map((color, idx) => {
      return <div 
        className="card-swatch"
        key={color + idx}
        style={{backgroundColor: color}}
       />
    })
  }

  console.log(name, " is liked?", !!liked)
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
            alert(resp.message)
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
            alert(resp.message)
        } else {
          dispatch(unlikePalette(resp))
          dispatch(updatePaletteLikes(resp, -1))
        }
        })
    }

  }



  return (
    <div className="palette-card" >
      <p>{name}</p>
      {renderCardSwatches()}
      {props.context === "gallery" ? <p>created by: {username}</p> : null}
      <div className="like-button" onClick={handleLike}> {liked ? "♥" : "♡" } </div>
    </div>
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