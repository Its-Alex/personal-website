import React, { Component } from 'react'

class Header extends Component {
  constructor (props) {
    super(props)
    this.scale = false
    this.handleScroll.bind(this)
    document.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll () {
    if (document.documentElement.scrollTop >= 200 && this.scale === false) {
      this.scale = true
      this.name.classList.add('scaleIn')
      this.name.classList.remove('scaleOut')
    } else if (document.documentElement.scrollTop < 200 && this.scale === true) {
      this.scale = false
      this.name.classList.add('scaleOut')
      this.name.classList.remove('scaleIn')
    }
  }

  render () {
    return (
      <div id='header'>
        <p ref={(elem) => { this.name = elem }} className='name'>ALEXANDRE</p>
        <ul className='menu'>
          <a href=''><li>PROFILE</li></a>
          <a href=''><li>EXPERIENCES</li></a>
          <a href=''><li>EDUCATION</li></a>
          <a href={`./CV_Alexandre_EN.pdf`} download='CV_fr.pdf' ><li>CV</li></a>
        </ul>
      </div>
    )
  }
}

export default Header
