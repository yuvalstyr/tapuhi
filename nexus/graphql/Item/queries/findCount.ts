import { queryField, nonNull, list } from 'nexus'

export const ItemFindCountQuery = queryField('findManyItemCount', {
  type: nonNull('Int'),
  args: {
    where: 'ItemWhereInput',
    orderBy: list('ItemOrderByInput'),
    cursor: 'ItemWhereUniqueInput',
    distinct: 'ItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.item.count(args as any)
  },
})
