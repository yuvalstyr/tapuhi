import * as React from 'react'
import { Item, saleType } from '@prisma/client'
import { FiEdit2 } from 'react-icons/fi'
import { GoCheck } from 'react-icons/go'
import { Card, Divider, Flex, Grid, Heading, IconButton, Label } from 'theme-ui'
import { itemsArray } from '../lib/item'
import Icon from './Icon'
import { ItemField, ItemRow } from './ItemRow'
import { Ioptions, Register, Remove } from '../type'

interface IItemList {
  fields: ItemField[]
  register: Register
  remove: Remove
  items: Ioptions[]
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

const ItemList: React.FC<IItemList> = ({ fields, remove, items }) => {
  const [editable, setEditable] = React.useState(false)
  const inputDispaly = editable ? '' : 'none'
  const labelDispaly = editable ? 'none' : ' '
  return (
    <Card sx={{ flexShrink: 1, overflow: 'hidden auto' }}>
      <Flex sx={{ position: 'sticky', top: 0, background: 'secondary' }}>
        <Heading sx={{ flexGrow: 1 }}>רשימת מוצרים</Heading>
        <IconButton
          type="button"
          onClick={() => setEditable(!editable)}
          sx={{ color: 'primary' }}
        >
          <Icon size={2}>{editable ? <GoCheck /> : <FiEdit2 />}</Icon>
        </IconButton>
      </Flex>

      {fields.map((field, index) => {
        const saleType = field.name
          ? getSaleType(itemsArray, field.name.value)
          : ''
        return (
          <React.Fragment key={field.id}>
            <Divider />

            <ItemRow {...{ field, index, remove, items, inputDispaly }} />

            <Grid
              columns={4}
              sx={{
                justifyContent: 'space-between',
                gridTemplateColumns: '3fr 2fr 2fr ',
                flexShrink: 1,
                display: labelDispaly,
              }}
            >
              <Label sx={{ fontWeight: 'bold' }}>{field?.name?.value}</Label>
              <Label>{`${field.quantity} ${saleType}`}</Label>
              <Label>{`${field.price} ש"ח`}</Label>
            </Grid>
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export default ItemList
