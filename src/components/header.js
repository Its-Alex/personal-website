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

  render () {
    return (
      <div id='header'>
        <p ref={(elem) => { this.name = elem }} className='name'>ALEXANDRE</p>
        <ul className='menu'>
          <a href='#profile'><li>PROFILE</li></a>
          <a href='#skills'><li>SKILLS</li></a>
          <a href='#projects'><li>PROJECTS</li></a>
          <Link to='/cv'><li>CV</li></Link>
        </ul>
      </div>
    )
  }
}

export default Header
