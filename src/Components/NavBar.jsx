
import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const NavBar = (props) => {
  if (props.user.id === 0) {
    return(
      <ul className="nav">
        <li className="grow">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/" exact>Palette Generator</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    )
  } else {
    return(
      <ul className="nav">
        <li className="grow">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/" exact >Fractal Machine</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="grow">
          <NavLink to="/" onClick={props.handleLogOut}>Log Out</NavLink>
        </li>
      </ul>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.userInfo.user
  }
}

export default connect(mapStateToProps)(NavBar);