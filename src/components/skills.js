import React, { Component } from 'react'

class Skills extends Component {
  render () {
    return (
      <div id='skills'>
        <div className='skill'>Golang</div>
        <div className='middle-container'>
          <div className='skill'>Javascript</div>
          <div className='skill'>Containers/VMs</div>
        </div>
        <div className='skill'>Dev Ops</div>
      </div>
    )
  }
}

export default Skills
