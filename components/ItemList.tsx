import { Item } from '@prisma/client'
import * as React from 'react'
import { GoPlus } from 'react-icons/go'
import { Card, Divider, Flex, Heading, IconButton } from 'theme-ui'
import { Append, Ioptions, Register, Remove } from '../type'
import Icon from './Icon'
import { ItemField, ItemRow } from './ItemRow'

interface IItemList {
  fields: ItemField[]
  register: Register
  remove: Remove
  items: Ioptions[]
  append: Append
  itemsArray: Item[]
}

const defaultValues = {
  name: { value: '', label: '' },
  price: '',
  quantity: '',
}

const ItemList: React.FC<IItemList> = ({
  fields,
  remove,
  items,
  append,
  itemsArray,
}) => {
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
            <ItemRow {...{ field, index, remove, items, itemsArray }} />
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export default ItemList
