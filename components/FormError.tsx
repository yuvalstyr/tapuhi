import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Text } from 'theme-ui'
import { Errors } from '../type'

interface IFromErrorProps {
  name: string
  errors: Errors
}

const FormError: React.FC<IFromErrorProps> = ({ errors, name }) => {
  if (!errors) return null
  if (!Object.keys(errors).length) return null
  console.log('errors', errors)
  return (
    <Text
      color={'error'}
      sx={{ gridColumn: '1 / span 2', fontSize: 1, fontWeight: 'bold' }}
    >
      {errors[name]?.type == 'validate' ? (
        'שדה חובה'
      ) : (
        <ErrorMessage {...{ errors, name }} />
      )}
    </Text>
  )
}

export default FormError
