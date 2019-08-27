/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import Sidebar from '../components/sidebar'

const Home = (props) => {
  return (
    <div id='root-container' css={css`
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% 80%;
  `} >
      <Sidebar id="sidebar" css={css`
        grid-column: 1 / 2;

        padding-right: 10%;
      `} />
      <div id="root-content" css={css`
        grid-column: 2 / 2;

        display: grid;
        place-items: center;
      `} >
        hey1
      </div>
    </div>
  )
}

export default Home
