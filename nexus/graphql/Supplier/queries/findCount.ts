import { queryField, nonNull, list } from 'nexus'

export const SupplierFindCountQuery = queryField('findManySupplierCount', {
  type: nonNull('Int'),
  args: {
    where: 'SupplierWhereInput',
    orderBy: list('SupplierOrderByInput'),
    cursor: 'SupplierWhereUniqueInput',
    distinct: 'SupplierScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.supplier.count(args as any)
  },
})
