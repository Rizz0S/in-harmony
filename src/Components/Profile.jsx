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
      <p>Hello, <b>{user.username}</b>.</p>

      <h3>Liked Palettes:</h3>
      <div className="palette-card-container">
      {user.liked_palettes.length > 0 ? renderPaletteCards(user.liked_palettes) : <p>You haven't liked any palettes yet.</p>}
      </div>
      <h3>Your Palettes: </h3>
      <div className="palette-card-container">
      {renderPaletteCards(user.user_palettes)}
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