import { mutationField, nonNull } from 'nexus'

export const ItemDeleteOneMutation = mutationField('deleteOneItem', {
  type: 'Item',
  args: {
    where: nonNull('ItemWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Item', where })
    return prisma.item.delete({
      where,
      ...select,
    })
  },
})
