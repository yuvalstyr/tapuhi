import { queryField, nonNull, list } from 'nexus'

export const SupplierFindManyQuery = queryField('findManySupplier', {
  type: nonNull(list(nonNull('Supplier'))),
  args: {
    where: 'SupplierWhereInput',
    orderBy: list('SupplierOrderByInput'),
    cursor: 'SupplierWhereUniqueInput',
    distinct: 'SupplierScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.supplier.findMany({
      ...args,
      ...select,
    })
  },
})
