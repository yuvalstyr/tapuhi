import { mutationField, nonNull } from 'nexus'

export const OrderDeleteManyMutation = mutationField('deleteManyOrder', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'OrderWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Order', where })
    return prisma.order.deleteMany({ where } as any)
  },
})
