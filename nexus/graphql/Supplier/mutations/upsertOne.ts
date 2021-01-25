import { mutationField, nonNull } from 'nexus'

export const SupplierUpsertOneMutation = mutationField('upsertOneSupplier', {
  type: nonNull('Supplier'),
  args: {
    where: nonNull('SupplierWhereUniqueInput'),
    create: nonNull('SupplierCreateInput'),
    update: nonNull('SupplierUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.supplier.upsert({
      ...args,
      ...select,
    })
  },
})
