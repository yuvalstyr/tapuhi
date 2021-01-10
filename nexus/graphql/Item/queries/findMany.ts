import { queryField, nonNull, list } from 'nexus'

export const ItemFindManyQuery = queryField('findManyItem', {
  type: nonNull(list(nonNull('Item'))),
  args: {
    where: 'ItemWhereInput',
    orderBy: list('ItemOrderByInput'),
    cursor: 'ItemWhereUniqueInput',
    distinct: 'ItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.item.findMany({
      ...args,
      ...select,
    })
  },
})
