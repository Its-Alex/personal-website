/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { get } from 'lodash'

const GithubCarousel = (props) => {
  const { loading, error, data } = useQuery(gql`
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
  `)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <Fragment>
      {get(data, 'user.repositories.edges', []).map((repo, index) => {
        console.log(repo.node)

        return (
          <div
            key={index}
            css={css`
              padding: 4px;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;

              border-radius: 0.25em;
              box-shadow: 0px 0px 45px 8px rgba(235,235,235,0.75);
            `}
          >
            <a
              href={repo.node.url}
            >
              <h2>{repo.node.name}</h2>
            </a>
            <p>{repo.node.description}</p>
            <div>
              {repo.node.languages.edges.map((language, index) => (
                <p
                  key={index}
                >
                  {language.node.name}
                </p>
              ))}
            </div>
            <div>
              {repo.node.repositoryTopics.edges.map((repositoryTopic, index) => (
                <p
                  key={index}
                >
                  <a
                    href={repositoryTopic.node.url}
                  >
                    {repositoryTopic.node.topic.name}
                  </a>
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default GithubCarousel
