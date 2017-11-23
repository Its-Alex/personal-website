import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor (props) {
    super(props)
    this.scale = false
    this.handleScroll.bind(this)
    document.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll () {
    if (document.documentElement.scrollTop >= 10 && this.scale === false) {
      this.scale = true
      if (this.name) {
        this.name.classList.add('scaleIn')
        this.name.classList.remove('scaleOut')
      }
    } else if (document.documentElement.scrollTop < 10 && this.scale === true) {
      this.scale = false
      if (this.name) {
        this.name.classList.add('scaleOut')
        this.name.classList.remove('scaleIn')
      }
    }
  }

  scrollTo (id) {
    document.getElementsByTagName('html')[0].scrollTo(0, document.getElementById(id).offsetTop)
  }

  render () {
    return (
      <div id='header'>
        <p ref={(elem) => { this.name = elem }} className='name'>ALEXANDRE</p>
        <ul className='menu'>
          <li onClick={this.scrollTo.bind(this, 'profile')}>PROFILE</li>
          <li onClick={this.scrollTo.bind(this, 'skills')}>SKILLS</li>
          <li onClick={this.scrollTo.bind(this, 'projects')}>PROJECTS</li>
          <Link to='/cv'><li>CV</li></Link>
        </ul>
      </div>
    )
  }
}

export default Header
