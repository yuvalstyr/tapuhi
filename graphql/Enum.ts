import { enumType } from 'nexus'

export const SaleType = enumType({
  name: 'SaleType',
  members: ['KG', 'PACK', 'WIEGHT_PACK', 'UNIT'],
})
