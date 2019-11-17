/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'

import Home from '../../src/pages/Home'

storiesOf('Pages/Home', module)
  .add('Home', () => {
    return <Home />
  })
