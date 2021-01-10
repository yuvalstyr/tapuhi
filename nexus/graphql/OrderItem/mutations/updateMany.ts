import { mutationField, nonNull } from 'nexus'

export const OrderItemUpdateManyMutation = mutationField(
  'updateManyOrderItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'OrderItemWhereInput',
      data: nonNull('OrderItemUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.orderItem.updateMany(args as any)
    },
  },
)
