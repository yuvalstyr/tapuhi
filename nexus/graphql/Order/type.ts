import { objectType } from 'nexus'

export const Order = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Order',

  definition(t) {
    t.int('id')
    t.field('date', { type: 'DateTime' })
    t.field('supplier', {
      type: 'Supplier',
      resolve(root: any) {
        return root.supplier
      },
    })
    t.int('supplierId')
    t.list.field('items', {
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
        return root.items
      },
    })
  },
})
