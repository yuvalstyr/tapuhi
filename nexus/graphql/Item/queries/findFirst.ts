import { queryField, list } from 'nexus'

export const ItemFindFirstQuery = queryField('findFirstItem', {
  type: 'Item',
  args: {
    where: 'ItemWhereInput',
    orderBy: list('ItemOrderByInput'),
    cursor: 'ItemWhereUniqueInput',
    distinct: 'ItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.item.findFirst({
      ...args,
      ...select,
    })
  },
})
