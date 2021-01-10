import { mutationField, nonNull } from 'nexus'

export const SupplierUpdateOneMutation = mutationField('updateOneSupplier', {
  type: nonNull('Supplier'),
  args: {
    where: nonNull('SupplierWhereUniqueInput'),
    data: nonNull('SupplierUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.supplier.update({
      where,
      data,
      ...select,
    })
  },
})
