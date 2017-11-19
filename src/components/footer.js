import React, { Component } from 'react'

import logo from '../assets/startup.svg'
import twitter from '../assets/twitter.svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'

class Footer extends Component {
  render () {
    return (
      <div id='footer'>
        <div className='credit'>
          <p className='copyright' dangerouslySetInnerHTML={{ __html: global.emojione.toImage(':copyright: 2017 - All right reserved') }} />
          <p className='author' >Made with React and <img src={logo} alt='logo' /> by Alexandre MARRE</p>
        </div>
        <div className='links'>
          <a href='https://github.com/Its-Alex'><img src={github} alt='github' /></a>
          <a href='https://www.linkedin.com/in/its-alex/'><img src={linkedin} alt='linkedin' /></a>
          <a href='https://twitter.com/Its_notme_Alex'><img src={twitter} alt='twitter' /></a>
        </div>
      </div>
    )
  }
}

export default Footer
