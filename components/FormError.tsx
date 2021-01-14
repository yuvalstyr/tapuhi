import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Text } from 'theme-ui'
import { Errors } from '../type'
import { get } from 'react-hook-form'

interface IFromErrorProps {
  name: string
  errors: Errors
}

const FormError: React.FC<IFromErrorProps> = ({ errors, name }) => {
  const error = get(errors, name)
  if (!error) return null

  return (
    <Text
      color={'error'}
      sx={{ gridColumn: '1 / span 2', fontSize: 1, fontWeight: 'bold' }}
    >
      {error.type == 'validate' ? (
        'שדה חובה'
      ) : (
        <ErrorMessage {...{ errors, name }} />
      )}
    </Text>
  )
}

export default FormError
