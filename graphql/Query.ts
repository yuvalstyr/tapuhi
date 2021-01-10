import { queryType } from 'nexus'
import prisma from '../lib/prisma'

export const Query = queryType({
  definition(t) {
    t.list.field('orders', {
      type: 'Order',
      resolve(t) {
        return prisma.order.findMany()
      },
    })
    t.list.field('suppliers', {
      type: 'Supplier',
      resolve(t) {
        return prisma.supplier.findMany()
      },
    })
  },
})
