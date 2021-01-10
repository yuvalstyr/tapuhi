import { mutationField, nonNull } from 'nexus'

export const OrderUpdateManyMutation = mutationField('updateManyOrder', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'OrderWhereInput',
    data: nonNull('OrderUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.order.updateMany(args as any)
  },
})
