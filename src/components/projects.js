import React, { Component } from 'react'

import axios from 'axios'

class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repos: []
    }
  }

  componentWillMount () {
    axios.get('https://api.github.com/users/its-alex/repos').then(res => {
      this.setState({ repos: res.data })
    }).catch(err => console.log(err))
  }

  render () {
    return (
      <div id='projects'>
        {this.state.repos.map((repo, i) => {
          if (repo === null) return <br />
          return (
            <div key={i} className='project-border'>
              <div className='project' >
                <p className='name'>{repo.name}</p>
                <p className='desc' dangerouslySetInnerHTML={{ __html: global.emojione.toImage(repo.description) }} />
                <p className='name'>{repo.language}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Projects
