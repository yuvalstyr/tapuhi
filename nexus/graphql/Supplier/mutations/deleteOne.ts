import { mutationField, nonNull } from 'nexus'

export const SupplierDeleteOneMutation = mutationField('deleteOneSupplier', {
  type: 'Supplier',
  args: {
    where: nonNull('SupplierWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Supplier', where })
    return prisma.supplier.delete({
      where,
      ...select,
    })
  },
})
