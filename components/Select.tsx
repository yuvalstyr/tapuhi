import React, { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
import { Ioptions } from '../type'
import FormError from './FormError'

interface ISelectProps {
  options: Ioptions[]
  label?: string
  name: string
  defaultValue?: number | string
  attachToBodyTrue?: boolean
  placeholder: string
}

export const reactSelectStyles = {
  container: (provided: CSSProperties) => ({
    ...provided,
    height: '100%',
    flexGrow: 1,
  }),
  control: (provided: CSSProperties, state: any) => {
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

export const Select: React.FC<ISelectProps> = ({
  options,
  label,
  name,
  defaultValue,
  attachToBodyTrue,
  placeholder,
}) => {
  const { errors, getValues, control } = useFormContext()
  const gridTemplateColumns = label ? '1fr 3fr' : '1fr'
  const defaultOption = defaultValue
    ? { value: defaultValue, label: defaultValue }
    : { value: '', label: '' }

  return (
    <Grid columns={2} sx={{ gridTemplateColumns, alignContent: 'baseline' }}>
      {label && <Label>{label}</Label>}

      <Controller
        inputId="react-select"
        as={<ReactSelect />}
        options={options}
        name={name}
        menuPlacement={'auto'}
        menuPosition="absolute"
        defaultValue={defaultOption}
        menuPortalTarget={attachToBodyTrue ? document.body : ''}
        isClearable
        control={control}
        placeholder={placeholder}
        rules={{
          validate: () => (getValues(name)?.value ? true : false),
        }}
      />

      <FormError errors={errors} name={name} />
    </Grid>
  )
}
