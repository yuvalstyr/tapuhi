import { queryField, nonNull, list } from 'nexus'

export const OrderItemFindCountQuery = queryField('findManyOrderItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'OrderItemWhereInput',
    orderBy: list('OrderItemOrderByInput'),
    cursor: 'OrderItemWhereUniqueInput',
    distinct: 'OrderItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.orderItem.count(args as any)
  },
})
