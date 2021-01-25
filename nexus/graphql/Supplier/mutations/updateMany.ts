import { mutationField, nonNull } from 'nexus'

export const SupplierUpdateManyMutation = mutationField('updateManySupplier', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'SupplierWhereInput',
    data: nonNull('SupplierUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.supplier.updateMany(args as any)
  },
})
