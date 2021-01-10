import { mutationField, nonNull } from 'nexus'

export const OrderItemDeleteManyMutation = mutationField(
  'deleteManyOrderItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'OrderItemWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      await prisma.onDelete({ model: 'OrderItem', where })
      return prisma.orderItem.deleteMany({ where } as any)
    },
  },
)
