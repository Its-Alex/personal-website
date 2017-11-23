import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

import Header from './components/header'
import Profile from './components/profile'
import Skills from './components/skills'
import Projects from './components/projects'
import Footer from './components/footer'
import pdfViewer from './components/pdfViewer'

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
          <Switch>
            <Route exact path='/cv' component={pdfViewer} />
            <Route path='/' component={({ history }) => {
              return (
                <div id='root-container'>
                  <Header history={history} />
                  <Profile />
                  <Skills />
                  <Projects />
                  <Footer />
                </div>
              )
            }} />
          </Switch>
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

ReactDOM.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
