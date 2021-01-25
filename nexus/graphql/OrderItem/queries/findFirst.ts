import { queryField, list } from 'nexus'

export const OrderItemFindFirstQuery = queryField('findFirstOrderItem', {
  type: 'OrderItem',
  args: {
    where: 'OrderItemWhereInput',
    orderBy: list('OrderItemOrderByInput'),
    cursor: 'OrderItemWhereUniqueInput',
    distinct: 'OrderItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.orderItem.findFirst({
      ...args,
      ...select,
    })
  },
})
