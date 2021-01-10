import { arg, list, mutationType } from 'nexus'
import prisma from '../lib/prisma'

export const Mutation = mutationType({
  definition(t) {
    t.list.field('createManyItems', {
      type: 'Item',
      args: {
        data: list('InputCreateItem'),
      },
      async resolve(_, { data }) {
        const promiseArray = data.map(async (item) => {
          return prisma.item.create({
            data: {
              ...item,
            },
          })
        })

        const result = await Promise.all(promiseArray)
        prisma.$disconnect()
        return result
      },
    })

    t.field('createOrder', {
      type: 'Order',
      args: {
        data: arg({ type: 'createOrderInput' }),
      },
      async resolve(_, { data }) {
        const { order, orderItem } = data
        // create order item array
        const craeteOrderItem = orderItem.map((o) => ({
          item: { connect: { id: o.itemId } },
          quantity: o.quantity,
          receiptNumber: o.receieptNumber,
          supplier: { connect: { id: order.supplierId } },
        }))
        // create order with item object
        const createdOrder = await prisma.order.create({
          data: {
            date: order.datetime,
            supplier: { connect: { id: order.supplierId } },
            items: {
              create: craeteOrderItem,
            },
          },
        })
        t.list.field('createManySupplier', {
          type: 'Supplier',
          args: {
            data: list('InputCreateSupplier'),
          },
          async resolve(_, { data }) {
            const promiseArray = data.map(async (supplier) => {
              return prisma.supplier.create({
                data: {
                  ...supplier,
                },
              })
            })
            const result = await Promise.all(promiseArray)
            prisma.$disconnect()
            return result
          },
        })

        return createdOrder
      },
    })
  },
})
