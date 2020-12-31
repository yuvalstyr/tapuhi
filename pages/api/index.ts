import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { asNexusMethod, makeSchema, objectType } from 'nexus'
import path from 'path'
import { Mutation } from '../../graphql/Mutation'
import { Query } from '../../graphql/Query'
import prisma from '../../lib/prisma'
import { Workout, WorkoutMutation } from '../../graphql/Workout'

export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime')
export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.string('phone')
    t.string('gender')
    t.list.field('workouts', {
      type: 'Workout',
      resolve: (parent) =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .Workout(),
    })
  },
})

export const schema = makeSchema({
  types: [
    User,
    Workout,
    WorkoutMutation,
    GQLDateTime,
    GQLDate,
    Mutation,
    Query,
  ],
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
