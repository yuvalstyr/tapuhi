import { Item, saleType } from '@prisma/client'
import * as React from 'react'
import { GoPlus } from 'react-icons/go'
import { Card, Divider, Flex, Heading, IconButton } from 'theme-ui'
import { itemsArray } from '../lib/item'
import { Append, Ioptions, Register, Remove } from '../type'
import Icon from './Icon'
import { ItemField, ItemRow } from './ItemRow'

interface IItemList {
  fields: ItemField[]
  register: Register
  remove: Remove
  items: Ioptions[]
  append: Append
}

const defaultValues = {
  name: { value: '', label: '' },
  price: '',
  quantity: '',
}

export const saleTypeTranslate: Partial<Record<saleType, string>> = {
  KG: 'ק"ג',
  PACK: 'חבילה',
  UNIT: 'יחידה',
  WIEGHT_PACK: 'יחידה שקולה',
}

function getSaleType(itemsArray: Item[], item: string) {
  const saleType = itemsArray.filter((i) => i.name === item)[0]?.saleType
  return saleTypeTranslate[saleType]
}

const ItemList: React.FC<IItemList> = ({ fields, remove, items, append }) => {
  return (
    <Card sx={{ flexShrink: 1, overflow: 'hidden auto' }}>
      <Flex sx={{ position: 'sticky', top: 0, background: 'secondary' }}>
        <Heading sx={{ flexGrow: 1 }}>רשימת מוצרים</Heading>
        <IconButton
          type="button"
          onClick={() => append(defaultValues)}
          sx={{ color: 'primary' }}
        >
          <Icon size={2}>{<GoPlus />}</Icon>
        </IconButton>
      </Flex>

      {fields.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            <Divider />
            <ItemRow {...{ field, index, remove, items }} />
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export default ItemList
