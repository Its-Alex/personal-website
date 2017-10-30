import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import './css/index.css'

class Index extends React.Component {
  render () {
    return (
      <div id='root-container'>
        salut
      </div>
    )
  }
}

export default Index

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
