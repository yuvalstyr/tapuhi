import { list, mutationField, nonNull } from 'nexus'
import { convertPromiseAll } from '../../../../lib/utils'

export const ItemCreateManyMutation = mutationField('createManyItem', {
  type: nonNull('BatchPayload'),
  args: {
    data: list(nonNull('ItemCreateInput')),
  },
  async resolve(_parent, { data }, { prisma }) {
    if (!data) return { count: 0 }

    const promises = data.map((i) => {
      const { category, name, saleType, description } = i
      return prisma.item.create({
        data: {
          category,
          name,
          saleType,
          description,
        },
      })
    })
    const results = await Promise.allSettled(promises)
    const createMany = convertPromiseAll(results)

    return { count: createMany.successCount }
  },
})
