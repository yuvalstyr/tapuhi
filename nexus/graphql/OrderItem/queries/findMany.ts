import { queryField, nonNull, list } from 'nexus'

export const OrderItemFindManyQuery = queryField('findManyOrderItem', {
  type: nonNull(list(nonNull('OrderItem'))),
  args: {
    where: 'OrderItemWhereInput',
    orderBy: list('OrderItemOrderByInput'),
    cursor: 'OrderItemWhereUniqueInput',
    distinct: 'OrderItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.orderItem.findMany({
      ...args,
      ...select,
    })
  },
})
