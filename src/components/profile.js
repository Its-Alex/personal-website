import React, { Component } from 'react'

import profilePic from '../assets/profile.jpg'
import svg from '../assets/rocket-ship.svg'

class Profile extends Component {
  componentDidMount () {
    document.getElementById('profile').style.paddingTop = `${document.getElementById('header').clientHeight}px`
  }

  render () {
    return (
      <div id='profile' >
        <img src={profilePic} alt='profile' />
        <div>
          <p className='work'>DEVELOPER</p>
          <div className='logo'>
            <div className='cut' />
            <img src={svg} alt='logo' />
            <div className='cut' />
          </div>
          <p className='language'>C - C++ - Javascript - NodeJS - Go</p>
        </div>
      </div>
    )
  }
}

export default Profile
