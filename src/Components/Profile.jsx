import React from 'react';
import {connect, useSelector} from 'react-redux';
import PaletteCard from '../Components/PaletteCard';

const Profile = (props) => {

  const user = useSelector( (state) => state.userInfo.user)

  const renderPaletteCards = (palettesArr) => {
    return palettesArr.map((palette) => {
      return <PaletteCard
        key={palette.id}
        palette={palette}
        context="profile"
        />
    })
  }

  return (
    <div>
      <h2>Hello, <b>{user.username}</b>.</h2>

      <p>Liked Palettes:</p>
      <div className="palette-card-container">
        { user.liked_palettes.length > 0 ? renderPaletteCards(user.liked_palettes) : <p style={{width: "100%"}}>You haven't liked any palettes yet.</p> }
      </div>
      <p>Your Palettes: </p>
      <div className="palette-card-container">
        { user.user_palettes.length > 0 ? renderPaletteCards(user.user_palettes) : <p style={{width: "100%"}}>You haven't made any palettes yet.</p> }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps)(Profile);;