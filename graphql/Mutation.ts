import { list, mutationType } from 'nexus'
import prisma from '../lib/prisma'
import { InputCreateItem } from './Input'

export const Mutation = mutationType({
  definition(t) {
    t.field('createManyItems', {
      type: 'CreateManyResponse',
      args: {
        data: list(InputCreateItem),
      },
      resolve(_, { data }) {
        const returnObj = {}
        Promise.allSettled(
          data.map(async (item) => {
            await prisma.item.create({
              data: {
                ...item,
              },
            })
            prisma.$disconnect()
          }),
        ).then((values) => {
          const allValues = values
            .filter((c) => c.status === 'fulfilled')
            .map((c) => <PromiseFulfilledResult<unknown>>c)
            .map((c) => c.value)
          returnObj['successCount'] = allValues.length
          console.log(allValues)
          const failedResults = values
            .filter((c) => c.status === 'rejected')
            .map((c) => <PromiseRejectedResult>c)
            .map((c) => c.reason)
          returnObj['errors'] = failedResults
          console.log(failedResults)
        })
        return {
          successCount: returnObj['successCount'],
          errors: returnObj['errors'],
        }
      },
    })
  },
})
