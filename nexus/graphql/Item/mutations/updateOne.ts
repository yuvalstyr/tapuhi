import { mutationField, nonNull } from 'nexus'

export const ItemUpdateOneMutation = mutationField('updateOneItem', {
  type: nonNull('Item'),
  args: {
    where: nonNull('ItemWhereUniqueInput'),
    data: nonNull('ItemUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.item.update({
      where,
      data,
      ...select,
    })
  },
})
