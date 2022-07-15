import React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

export default function Alerts(props) {
  //const [open, setOpen] = React.useState(true)
  console.log(props)
  return (
    <Box sx={{ width: 'auto' }}>
      <Collapse in={true}>
        <Alert
          severity={props.alertMessage.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={props.onClick}
            >
              {/* <CloseIcon fontSize="inherit" /> */}
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.alertMessage.message}
        </Alert>
      </Collapse>
    </Box>
  )
}
