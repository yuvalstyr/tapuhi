import { objectType } from 'nexus'

export const OrderItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'OrderItem',
  definition(t) {
    t.int('id')
    t.field('item', {
      type: 'Item',
      resolve(root: any) {
        return root.item
      },
    })
    t.float('quantity')
    t.float('price')
    t.field('Order', {
      type: 'Order',
      resolve(root: any) {
        return root.Order
      },
    })
    t.int('orderId')
    t.string('itemId')
    t.field('supplier', {
      type: 'Supplier',
      resolve(root: any) {
        return root.supplier
      },
    })
    t.int('supplierId')
  },
})
