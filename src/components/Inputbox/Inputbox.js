import React from 'react'
import { TextField } from '@mui/material'

const InputBox = ({
  label,
  input,
  type,
  onChange,
  value,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    fullWidth
    size="small"
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    onChange={input.onChange}
    value={value}
    type={type}
    {...input}
    {...custom}
  />
)
export default InputBox
