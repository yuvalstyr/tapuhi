import { mutationField, nonNull } from 'nexus'

export const SupplierCreateOneMutation = mutationField('createOneSupplier', {
  type: nonNull('Supplier'),
  args: {
    data: nonNull('SupplierCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.supplier.create({
      data,
      ...select,
    })
  },
})
