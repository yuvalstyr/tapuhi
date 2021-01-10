import { queryField, nonNull } from 'nexus'

export const SupplierFindUniqueQuery = queryField('findUniqueSupplier', {
  type: 'Supplier',
  args: {
    where: nonNull('SupplierWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.supplier.findUnique({
      where,
      ...select,
    })
  },
})
