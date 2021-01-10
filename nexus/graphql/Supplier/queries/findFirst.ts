import { queryField, list } from 'nexus'

export const SupplierFindFirstQuery = queryField('findFirstSupplier', {
  type: 'Supplier',
  args: {
    where: 'SupplierWhereInput',
    orderBy: list('SupplierOrderByInput'),
    cursor: 'SupplierWhereUniqueInput',
    distinct: 'SupplierScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.supplier.findFirst({
      ...args,
      ...select,
    })
  },
})
