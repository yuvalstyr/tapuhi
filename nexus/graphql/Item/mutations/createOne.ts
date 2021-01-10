import { mutationField, nonNull } from 'nexus'

export const ItemCreateOneMutation = mutationField('createOneItem', {
  type: nonNull('Item'),
  args: {
    data: nonNull('ItemCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.item.create({
      data,
      ...select,
    })
  },
})
