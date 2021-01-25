import { mutationField, nonNull } from 'nexus'

export const ItemUpdateManyMutation = mutationField('updateManyItem', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ItemWhereInput',
    data: nonNull('ItemUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.item.updateMany(args as any)
  },
})
