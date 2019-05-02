import React, { Component } from 'react'

import svg from '../assets/rocket-ship.svg'

class Profile extends Component {
  componentDidMount () {
    document.getElementById('profile').style.paddingTop = `${document.getElementById('header').clientHeight}px`
  }

  render () {
    return (
      <div id='profile' >
        <img src='https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=512' alt='profile' />
        <div>
          <p className='work'>DEVELOPER</p>
          <div className='logo'>
            <div className='cut' />
            <img src={svg} alt='logo' />
            <div className='cut' />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
