/** @jsx jsx */
import { jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import apolloStorybookDecorator from 'apollo-storybook-react'

import GlobalTheme from '../../src/components/Theme'
import GithubCarousel from '../../src/components/GithubCarousel'

const typeDefs = `
  type Query {
    helloWorld: String
  }

  schema {
    query: Query
  }
`

const mocks = {
  Query: () => {
    return {
      user: (login) => {
        return 'Hello from Apollo!!'
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
