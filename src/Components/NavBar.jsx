
import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const NavBar = (props) => {
    return(
      <ul className="nav">
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/" exact>Palette Generator</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        { props.user.id === 0 ? 
        <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li> 
        </>
        :
        <>
        <li>
        <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={props.handleLogOut}>Log Out</NavLink>
        </li>
        </>
        }
      </ul>
    )
};

const mapStateToProps = (state) => {
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps)(NavBar);