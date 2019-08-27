/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { storiesOf } from '@storybook/react'

import Sidebar from '../../src/components/sidebar'

storiesOf('Components/Sidebar', module)
  .add('Sidebar', () => {
    return <Sidebar css={css` width: 100%; height: 100%; `} />
  })
