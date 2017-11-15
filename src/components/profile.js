import React, { Component } from 'react'

import profilePic from '../assets/profile.jpg'

class Profile extends Component {
  render () {
    return (
      <div id='profile' >
        <img src={profilePic} alt='profile' />
        <p>
          <span>D</span>
          <span>E</span>
          <span>V</span>
          <span>E</span>
          <span>L</span>
          <span>O</span>
          <span>P</span>
          <span>E</span>
          <span>R</span>
          <span> - </span>
          <span>S</span>
          <span>T</span>
          <span>U</span>
          <span>D</span>
          <span>E</span>
          <span>N</span>
          <span>T</span>
        </p>
      </div>
    )
  }
}

export default Profile
