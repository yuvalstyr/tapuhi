import { mutationField, nonNull } from 'nexus'

export const SupplierDeleteManyMutation = mutationField('deleteManySupplier', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'SupplierWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Supplier', where })
    return prisma.supplier.deleteMany({ where } as any)
  },
})
