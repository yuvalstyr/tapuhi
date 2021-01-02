/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, Button, Card, Input, Text } from 'theme-ui'
import { useCombobox } from 'downshift'

export const DropdownCombobox: React.FC<{ items: string[] }> = ({ items }) => {
  const [inputItems, setInputItems] = React.useState(items)
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      )
    },
  })
  return (
    <Box
      {...getComboboxProps({
        id: 'autocomplete',
        'aria-owns': 'downshift-menu',
      })}
    >
      <Input
        {...getInputProps({
          id: 'autocomplete-input',
          'aria-controls': 'downshift-menu',
          'aria-labelledby': 'downshift-label',
        })}
      />

      {isOpen && Boolean(inputItems.length) && (
        <Card
          {...getMenuProps({
            id: 'autocomplete-menu',
            'aria-labelledby': 'downshift-label',
          })}
          sx={{
            position: 'absolute',
            backgrounColor: 'red',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            padding: '12px 16px',
            zIndex: 1,
            maxHeight: '25vh',
            overflow: 'hidden auto',
          }}
        >
          {inputItems.map((item, index) => (
            <Text
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </Text>
          ))}
        </Card>
      )}
    </Box>
  )
}
