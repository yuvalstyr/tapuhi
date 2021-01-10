import { mutationField, nonNull } from 'nexus'

export const ItemDeleteManyMutation = mutationField('deleteManyItem', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ItemWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Item', where })
    return prisma.item.deleteMany({ where } as any)
  },
})
