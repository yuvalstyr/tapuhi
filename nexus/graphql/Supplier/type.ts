import { objectType } from 'nexus'

export const Supplier = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Supplier',
  definition(t) {
    t.int('id')
    t.string('name')
    t.list.field('Order', {
      type: 'Order',
      args: {
        where: 'OrderWhereInput',
        orderBy: 'OrderOrderByInput',
        cursor: 'OrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'OrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Order
      },
    })
    t.list.field('OrderItem', {
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
        return root.OrderItem
      },
    })
  },
})
