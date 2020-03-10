import React from 'react';
import Profile from '../Components/Profile';
import Gallery from '../Containers/Gallery';

const ProfileContainer = (props) => {
  return (
    <div>
      <h2>Profile</h2>
      <Profile />
      <Gallery />
    </div>
  )
}

export default ProfileContainer;