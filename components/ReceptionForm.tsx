import React from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Input,
  Label,
  Heading,
  Divider,
} from 'theme-ui'
import { DropdownCombobox } from './DropdownCombobox'
import { itemArray } from '../lib/item'
import DatePicker, { registerLocale } from 'react-datepicker'
import { FiEdit2 } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { he } from 'date-fns/locale'
import Icon from './Icon'

const ReceptionForm = () => {
  const [startDate, setStartDate] = React.useState(new Date())
  registerLocale('he', he)
  const items = itemArray.map((i) => i.name)
  return (
    <Box
      as="form"
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '12px',
        width: ['80vw'],
        marginTop: '5em',
      }}
    >
      <Card>
        <Grid columns={2}>
          <Heading sx={{ gridColumn: '1 / 2 span' }}>הזמנה חדשה</Heading>
          <Flex sx={{ flexDirection: 'column' }}>
            <Label>ספק</Label>
            <DropdownCombobox items={items} />
          </Flex>
          <Flex sx={{ flexDirection: 'column' }}>
            <Label>תאריך</Label>
            <Box>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                locale="he"
                indexFormat="dd-MM-yy"
                customInput={<Input />}
              />
            </Box>
          </Flex>
          <Flex sx={{ flexDirection: 'column' }}>
            <Label>מספר תעודה</Label>
            <Input />
          </Flex>
        </Grid>
      </Card>
      <Card>
        <Heading sx={{ gridColumn: '1 / 2 span' }}>הוספת מוצר </Heading>
        <Grid columns={2}>
          <Label>ספק</Label>
          <DropdownCombobox items={items} />
          <Label>כמות</Label>
          <Input />
          <Label>מחיר</Label>
          <Input />

          <Button
            type="button"
            sx={{ justifySelf: 'center', gridColumn: '1 / 2 span' }}
          >
            הוסף
          </Button>
        </Grid>
      </Card>
      <Card>
        <Heading sx={{ gridColumn: '1 / 2 span' }}>רשימת מוצרים</Heading>
        <Grid columns={7} sx={{ justifyContent: 'space-between' }}>
          <Heading as="h3">עגבניה</Heading>
          <Label>19-01-21</Label>
          <Label>19 יח'</Label>
          <Label>25 ש"ח</Label>
          <Label>10215415</Label>
          <Icon size={2}>
            <FiEdit2 />
          </Icon>
          <Icon size={2}>
            <MdDelete />
          </Icon>
        </Grid>
        <Divider />
        <Grid columns={7} sx={{ justifyContent: 'space-between' }}>
          <Heading as="h3">עגבניה</Heading>
          <Label>19-01-21</Label>
          <Label>19 יח'</Label>
          <Label>25 ש"ח</Label>
          <Label>10215415</Label>
          <Icon size={2}>
            <FiEdit2 />
          </Icon>
          <Icon size={2}>
            <MdDelete />
          </Icon>
        </Grid>
        <Divider />
        <Grid columns={7} sx={{ justifyContent: 'space-between' }}>
          <Heading as="h3">עגבניה</Heading>
          <Label>19-01-21</Label>
          <Label>19 יח'</Label>
          <Label>25 ש"ח</Label>
          <Label>10215415</Label>
          <Icon size={2}>
            <FiEdit2 />
          </Icon>
          <Icon size={2}>
            <MdDelete />
          </Icon>
        </Grid>
      </Card>
      <Button>צור הזמנה</Button>
    </Box>
  )
}

export default ReceptionForm
