import { Prisma, Supplier } from '@prisma/client'
import { list, mutationField, nonNull } from 'nexus'
import { convertPromiseAll } from '../../../../lib/utils'

export const ItemCreateManyMutation = mutationField('createManySupplier', {
  type: nonNull('BatchPayload'),
  args: {
    data: list(nonNull('SupplierCreateInput')),
  },
  async resolve(_parent, { data }, { prisma }) {
    if (!data) return { count: 0 }

    const promises: Prisma.Prisma__ItemClient<Supplier>[] = data.map(
      (i: Prisma.SupplierCreateInput) => {
        const { name } = i
        return prisma.supplier.create({
          data: {
            name,
          },
        })
      },
    )

    const result = await Promise.allSettled(promises)
    const createMany = convertPromiseAll(result)

    return { count: createMany.successCount }
  },
})
