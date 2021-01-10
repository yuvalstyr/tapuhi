import { inputObjectType } from 'nexus'

export const OrderInput = inputObjectType({
  name: 'OrderInput',
  definition(t) {
    t.nonNull.dateTime('datetime')
    t.nonNull.int('supplierId')
  },
})

export const OrderItemInput = inputObjectType({
  name: 'OrderItemInput',
  definition(t) {
    t.nonNull.float('quantity')
    t.nonNull.string('receieptNumber')
    t.nonNull.string('itemId')
  },
})

export const createOrderInput = inputObjectType({
  name: 'createOrderInput',
  definition(t) {
    t.nonNull.field('order', { type: OrderInput })
    t.nonNull.list.field('orderItem', { type: OrderItemInput })
  },
})

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
export const InputCreateSupplier = inputObjectType({
  name: 'InputCreateSupplier',
  definition(t) {
    t.nonNull.string('name')
  },
})
