import { queryField, nonNull } from 'nexus'

export const ItemFindUniqueQuery = queryField('findUniqueItem', {
  type: 'Item',
  args: {
    where: nonNull('ItemWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.item.findUnique({
      where,
      ...select,
    })
  },
})
