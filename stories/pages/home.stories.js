/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'

import Home from '../../src/pages/home'

storiesOf('Pages/Home', module)
  .add('Home', () => {
    return <Home />
  })
