/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import { buildClientSchema, printSchema } from 'graphql'
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
        Query: () => {
          return {}
        }
      }
    })
  )
  .add('Default', () => {
    return <GlobalTheme><GithubCarousel /></GlobalTheme>
  })
