/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import { buildClientSchema, printSchema } from 'graphql'
import { sample } from 'lodash'
import apolloStorybookDecorator from 'apollo-storybook-react'

import GithubGraphQLTypeDefs from '../graphql-schema/github.json'
import GlobalTheme from '../../src/components/Theme'
import GithubCarousel from '../../src/components/GithubCarousel'

storiesOf('Components/Github carousel', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs: printSchema(buildClientSchema(GithubGraphQLTypeDefs)),
      mocks: {
        URI: () => 'http://localhost',
        Repository: () => {
          return {
            name: sample(['Repo 1', 'Repo 2', 'Repo 3']),
            description: sample(['Desc 1', 'Desc 2', 'Desc 3']),
            url: sample(['http://localhost/1', 'http://localhost/2', 'http://localhost/3'])
          }
        },
        Language: () => {
          return {
            name: sample(['Golang', 'Javascript', 'Html'])
          }
        },
        RepositoryTopic: () => {
          return {
            topic: {
              name: sample(['gRPC', 'SSH', 'Automation'])
            }
          }
        },
        Query: () => {
          return {}
        }
      }
    })
  )
  .add('Default', () => {
    return (
      <GlobalTheme>
        <div
          css={css`
            display: flex;
            flex-direction: column;

            div {
              margin: 10px;
            }
          `}
        >
          <GithubCarousel />
        </div>
      </GlobalTheme>
    )
  })
