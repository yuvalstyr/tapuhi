import { mutationField, nonNull } from 'nexus'

export const OrderDeleteOneMutation = mutationField('deleteOneOrder', {
  type: 'Order',
  args: {
    where: nonNull('OrderWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    const { id } = where
    if (!id) throw Error('where must include id')
    await prisma.orderItem.deleteMany({
      where: { Order: { id: { equals: id } } },
    })

    return prisma.order.delete({
      where,
      ...select,
    })
  },
})
