import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { asNexusMethod, enumType, list, makeSchema, objectType } from 'nexus'
import path from 'path'
import * as types from '../../graphql'

export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime')
export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const schema = makeSchema({
  types: [GQLDateTime, GQLDate, types],

  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
})
