import { mutationField, nonNull } from 'nexus'

export const ItemUpsertOneMutation = mutationField('upsertOneItem', {
  type: nonNull('Item'),
  args: {
    where: nonNull('ItemWhereUniqueInput'),
    create: nonNull('ItemCreateInput'),
    update: nonNull('ItemUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.item.upsert({
      ...args,
      ...select,
    })
  },
})
