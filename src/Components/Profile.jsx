import React from 'react';
import {connect} from 'react-redux'

const Profile = (props) => {
  return (
    <div>
      <p>Hello, <b>{props.user.username}</b>.</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps)(Profile);;