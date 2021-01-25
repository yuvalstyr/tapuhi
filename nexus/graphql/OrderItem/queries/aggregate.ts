import { queryField, list } from 'nexus'

export const OrderItemAggregateQuery = queryField('aggregateOrderItem', {
  type: 'AggregateOrderItem',
  args: {
    where: 'OrderItemWhereInput',
    orderBy: list('OrderItemOrderByInput'),
    cursor: 'OrderItemWhereUniqueInput',
    distinct: 'OrderItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.orderItem.aggregate({ ...args, ...select }) as any
  },
})
