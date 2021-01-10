import { objectType } from 'nexus'

export const Item = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Item',

  definition(t) {
    t.string('id')
    t.string('name')
    t.string('description')
    t.string('category')
    t.nullable.string('snWebSite')
    t.nullable.string('snHerzelia')
    t.field('saleType', { type: 'saleType' })
    t.list.field('OrderItems', {
      type: 'OrderItem',
      args: {
        where: 'OrderItemWhereInput',
        orderBy: 'OrderItemOrderByInput',
        cursor: 'OrderItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'OrderItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.OrderItems
      },
    })
  },
})
