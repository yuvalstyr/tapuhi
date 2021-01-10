import { ApolloServer } from 'apollo-server-micro'
import { createContext } from '../../nexus/context'
import { schema } from '../../nexus/nexusSchema'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({
  schema,
  context: createContext,
}).createHandler({
  path: '/api',
})
