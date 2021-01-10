import { mutationField, nonNull } from 'nexus'

export const OrderDeleteOneMutation = mutationField('deleteOneOrder', {
  type: 'Order',
  args: {
    where: nonNull('OrderWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Order', where })
    return prisma.order.delete({
      where,
      ...select,
    })
  },
})
