import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import Header from './components/header'
import Profile from './components/profile'
import Skills from './components/skills'
import Projects from './components/projects'
import Footer from './components/footer'

import './scss/index.scss'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    let self = this
    window.onload = () => {
      self.setState({ loaded: true })
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <div id='root-container'>
          <Header />
          <Profile />
          <Skills />
          <Projects />
          <Footer />
        </div>
      )
    } else {
      return (
        <div id='loading'>
          <div className='spinner'>
            <div className='double-bounce1' />
            <div className='double-bounce2' />
          </div>
        </div>
      )
    }
  }
}

export default Index

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
