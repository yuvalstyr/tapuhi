import { mutationField, nonNull } from 'nexus'

export const OrderItemUpdateOneMutation = mutationField('updateOneOrderItem', {
  type: nonNull('OrderItem'),
  args: {
    where: nonNull('OrderItemWhereUniqueInput'),
    data: nonNull('OrderItemUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.orderItem.update({
      where,
      data,
      ...select,
    })
  },
})
