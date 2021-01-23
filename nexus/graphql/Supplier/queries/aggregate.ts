import { queryField, list } from 'nexus'

export const SupplierAggregateQuery = queryField('aggregateSupplier', {
  type: 'AggregateSupplier',
  args: {
    where: 'SupplierWhereInput',
    orderBy: list('SupplierOrderByInput'),
    cursor: 'SupplierWhereUniqueInput',
    distinct: 'SupplierScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.supplier.aggregate({ count: true }) as any
  },
})
