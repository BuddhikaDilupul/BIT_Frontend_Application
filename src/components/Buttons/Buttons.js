import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
const ButtonComponent = (props) => {
  return (
    <LoadingButton
      style={{ marginBottom: '10px', marginTop: '10px', marginRight: '5px' }}
      variant="contained"
      color={props.data.color}
      type={props.data.type}
      onClick={props.onClick}
      size={props.data.size}
      startIcon={props.data.startIcon}
      loading={props.loading}
      loadingPosition="start"
    >
      {props.data.label}
    </LoadingButton>
  )
}

export default ButtonComponent
