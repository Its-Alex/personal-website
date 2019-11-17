/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const REPOSITORIES_INFO = gql`
  {
    user(login: "Its-Alex") {
      repositories(isFork: false, first: 50, privacy: PUBLIC) {
        edges {
          node {
            name
            description
            url
            repositoryTopics(first: 10) {
              edges {
                node {
                  url
                  topic {
                    id
                    name
                  }
                }
              }
            }
            languages(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

const GithubCarousel = (props) => {
  const { loading, error, data } = useQuery(REPOSITORIES_INFO)

  console.log(data)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <Fragment>
      hey
    </Fragment>
  )
}

export default GithubCarousel
