import { queryField, list } from 'nexus'

export const ItemAggregateQuery = queryField('aggregateItem', {
  type: 'AggregateItem',
  args: {
    where: 'ItemWhereInput',
    orderBy: list('ItemOrderByInput'),
    cursor: 'ItemWhereUniqueInput',
    distinct: 'ItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.item.aggregate({ ...args, ...select }) as any
  },
})
