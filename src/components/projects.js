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
        Section in progress...
        {/* {this.state.repos.map((repo, i) => {
          if (!repo.fork) {
            return (
              <div key={i} className='project'>
                <p className='name'>{repo.name}</p>
                <p className='desc' dangerouslySetInnerHTML={{ __html: global.emojione.toImage(repo.description) }} />
                <p className='name'>{repo.language}</p>
              </div>
            )
          } else return null
        })} */}
      </div>
    )
  }
}

export default Projects
