import { Item } from '@prisma/client'
import { list, mutationField, nonNull } from 'nexus'
import { convertPromiseAll } from '../../../../lib/utils'

export const ItemCreateManyMutation = mutationField('createManyItem', {
  type: nonNull('BatchPayload'),
  args: {
    data: list(nonNull('ItemCreateInput')),
  },
  async resolve(_parent, { data }, { prisma }) {
    if (!data) return { count: 0 }

    const promises: Promise<any>[] = data.map((i: Item) => {
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

    const result = await Promise.allSettled(promises)
    const createMany = convertPromiseAll(result)

    return { count: createMany.successCount }
  },
})
