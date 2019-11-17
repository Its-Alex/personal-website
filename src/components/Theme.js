import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import Helmet from 'react-helmet'

const Theme = (props) => {
  return (
    <>
      <Helmet>
        <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap' rel='stylesheet' />
      </Helmet>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            outline: none;
            scroll-behavior: smooth;
            font-family: 'Lato', sans-serif;
            font-size: 1rem;
          }

          ::-webkit-scrollbar-track {
            background: #bdbdbd;
          }

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #757575;
          }

          html, body, #root, #root-container {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #FCFBFB;
          }

          li {
            list-style-type: none;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
            color: inherit;
            font-weight: 700;
            font-size: 1.1rem;
          }
        `}
      />
      {props.children && (props.children)}
    </>
  )
}

Theme.propTypes = {
  children: PropTypes.element
}

export default Theme
