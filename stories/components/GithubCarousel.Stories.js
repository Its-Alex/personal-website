/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import apolloStorybookDecorator from 'apollo-storybook-react'

import GlobalTheme from '../../src/components/Theme'
import GithubCarousel from '../../src/components/GithubCarousel'

const typeDefs = `
  enum Privacy {
    PUBLIC
    PRIVATE
  }

  type RepositoryTopics {
    id: String
    name: String
  }

  type Languages {
    name: String
  }

  type Repositories {
    name: String
    description: String
    url: String
    repositoryTopics(first: Int): RepositoryTopics
    languages(first: Int): Languages
  }

  type User {
    repositories(isFork: Boolean, first: Int, privacy: Privacy): Repositories
  }

  type Query {
    user(login: String): User
  }
`

const mocks = {
  Query: () => {
    return {
      user: (login) => {
        return {
          repositories: (isFork, first, privacy) => {
            return {
              name: '',
              description: '',
              url: '',
              repositoryTopics: (first) => {
                return {
                  id: '',
                  name: ''
                }
              },
              languages: (first) => {
                return {
                  name: ''
                }
              }
            }
          }
        }
      }
    }
  }
}

storiesOf('Components/Github carousel', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks
    })
  )
  .add('Default', () => {
    return <GlobalTheme><GithubCarousel /></GlobalTheme>
  })
