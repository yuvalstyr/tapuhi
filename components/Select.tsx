import React from 'react'
import { Control, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
import { isSSR } from '../lib/isSSR'
import { Ioptions, Errors, GetValues } from '../type'
import FormError from './FormError'

export const reactSelectStyles = {
  container: (provided) => ({
    ...provided,
    height: '100%',
    flexGrow: 1,
  }),
  control: (provided, state) => {
    return {
      ...provided,
      border: 'solid 1px #F5F5F5',
      height: '100%',
      boxShadow: state.menuIsOpen ? '0 0 0 3px #92C03E' : 0,
    }
  },
  menu: () => {
    return { zindex: '999', position: 'absolute' }
  },
}

interface ISelectProps {
  control: Control
  items: Ioptions[]
  label?: string
  name: string
  errors: Errors
  getValues: GetValues
  defaultValue: string
}

export const Select: React.FC<ISelectProps> = ({
  control,
  items,
  label,
  name,
  errors,
  getValues,
  defaultValue,
}) => {
  const gridTemplateColumns = label ? '1fr 3fr' : '1fr'

  return (
    <Grid columns={2} sx={{ gridTemplateColumns, alignItems: 'center' }}>
      {label && <Label>{label}</Label>}

      <Controller
        inputId="react-select"
        as={ReactSelect}
        options={items}
        name={name}
        control={control}
        isClearable={label ? true : false}
        defaultValue={{ value: defaultValue, label: defaultValue }}
        menuPlacement={'auto'}
        menuPosition="absolute"
        menuPortalTarget={document.body}
        rules={{
          validate: () => (getValues(name)?.value ? true : false),
        }}
      />

      <FormError name={name} errors={errors} />
    </Grid>
  )
}
