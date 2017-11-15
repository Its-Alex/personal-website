import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import Header from './components/header'
import Profile from './components/profile'
import Footer from './components/footer'

import './scss/index.scss'

class Index extends React.Component {
  render () {
    return (
      <div id='root-container'>
        <Header />
        <Profile />
        <Footer />
      </div>
    )
  }
}

export default Index

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
