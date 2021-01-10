import { mutationField, nonNull } from 'nexus'

export const OrderUpdateOneMutation = mutationField('updateOneOrder', {
  type: nonNull('Order'),
  args: {
    where: nonNull('OrderWhereUniqueInput'),
    data: nonNull('OrderUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.order.update({
      where,
      data,
      ...select,
    })
  },
})
