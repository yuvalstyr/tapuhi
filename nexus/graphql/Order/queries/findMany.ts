import { queryField, nonNull, list } from 'nexus'

export const OrderFindManyQuery = queryField('findManyOrder', {
  type: nonNull(list(nonNull('Order'))),
  args: {
    where: 'OrderWhereInput',
    orderBy: list('OrderOrderByInput'),
    cursor: 'OrderWhereUniqueInput',
    distinct: 'OrderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.order.findMany({
      ...args,
      ...select,
    })
  },
})
