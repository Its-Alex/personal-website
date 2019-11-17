import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import Home from './pages/Home'
import './i18n/i18n'
import './index.css'

ReactDOM.render(<Home />, document.getElementById('root'))

serviceWorker.unregister()
