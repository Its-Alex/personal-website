import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div id='header'>
        <p className='name'>ALEXANDRE</p>
        <ul className='menu'>
          <a href=''><li>PROFILE</li></a>
          <a href=''><li>EXPERIENCES</li></a>
          <a href=''><li>ETUDES</li></a>
        </ul>
      </div>
    )
  }
}

export default Header