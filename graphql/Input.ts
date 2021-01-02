import { inputObjectType } from 'nexus'

export const InputCreateItem = inputObjectType({
  name: 'InputCreateItem',
  definition(t) {
    t.string('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.string('category')
    t.string('snWebSite')
    t.string('snHerzelia')
    t.nonNull.field('saleType', { type: 'SaleType' })
  },
})
