import { Item } from '@prisma/client'
import * as React from 'react'
import { GoPlus } from 'react-icons/go'
import { Card, Divider, Flex, Heading, IconButton } from 'theme-ui'
import { Append, Ioptions, Register, Remove } from '../type'
import Icon from './Icon'
import { ItemField, ItemRow } from './ItemRow'
<<<<<<< HEAD
import { Ioptions, Register, Remove } from '../type'
=======
>>>>>>> paljs

interface IItemList {
  fields: ItemField[]
  remove: Remove
  items: Ioptions[]
<<<<<<< HEAD
=======
  append: Append
  itemsArray: Item[]
>>>>>>> paljs
}

const defaultValues = {
  name: { value: '', label: '' },
  price: '',
  quantity: '',
}

<<<<<<< HEAD
function getSaleType(itemsArray: Item[], item) {
  const saleType = itemsArray.filter((i) => i.name === item)[0]?.saleType
  return saleTypeTranslate[saleType]
}

const ItemList: React.FC<IItemList> = ({ fields, items, remove }) => {
  const [editable, setEditable] = React.useState(false)
=======
const ItemList: React.FC<IItemList> = ({
  fields,
  remove,
  items,
  append,
  itemsArray,
}) => {
>>>>>>> paljs
  return (
    <Card sx={{ flexShrink: 1, overflow: 'auto' }}>
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
<<<<<<< HEAD
            {editable ? (
              <ItemRow {...{ field, index, remove, items }} />
            ) : (
              <Grid
                columns={4}
                sx={{
                  justifyContent: 'space-between',
                  gridTemplateColumns: '3fr 2fr 2fr ',
                  flexShrink: 1,
                }}
              >
                <Heading as="h3">{field.name}</Heading>
                <Label>{`${field.quantity} ${getSaleType(
                  itemsArray,
                  field.name,
                )}`}</Label>
                <Label>{`${field.price} ש"ח`}</Label>
              </Grid>
            )}
=======
            <ItemRow {...{ field, index, remove, items, itemsArray }} />
>>>>>>> paljs
          </React.Fragment>
        )
      })}
    </Card>
  )
}

export default ItemList
