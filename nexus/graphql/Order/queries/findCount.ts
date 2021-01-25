import { queryField, nonNull, list } from 'nexus'

export const OrderFindCountQuery = queryField('findManyOrderCount', {
  type: nonNull('Int'),
  args: {
    where: 'OrderWhereInput',
    orderBy: list('OrderOrderByInput'),
    cursor: 'OrderWhereUniqueInput',
    distinct: 'OrderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.order.count(args as any)
  },
})
