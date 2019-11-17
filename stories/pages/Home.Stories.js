/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'

import Home from '../../src/pages/Home'
import GlobalTheme from '../../src/components/Theme'

storiesOf('Pages/Home', module)
  .add('Home', () => {
    return <GlobalTheme>
      <Home />
    </GlobalTheme>
  })
