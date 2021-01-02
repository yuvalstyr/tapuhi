import { list, objectType } from 'nexus'
import { SaleType } from './Enum'

export const OrderItem = objectType({
  name: 'OrderItem',
  definition(t) {
    t.int('id')
    t.float('quantity')
    t.string('receieptNumber')
    t.string('orderId')
    t.string('itemId')
    t.int('supplierId')
  },
})

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.string('category')
    t.string('snWebSite')
    t.string('snHerzelia')
    t.field('saleType', { type: SaleType })
    t.field('OrderItems', {
      type: list(OrderItem),
    })
  },
})

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.int('id')
    t.dateTime('date')
    t.int('supplierId')
    t.field('items', {
      type: list(OrderItem),
    })
  },
})

export const CreateManyResponse = objectType({
  name: 'CreateManyResponse',
  definition(t) {
    t.int('successCount')
    t.list.string('errors')
  },
})
