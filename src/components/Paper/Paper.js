import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function Variants() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 75,
          height: 75,
        },
      }}
    >
      <Paper variant="outlined">hi</Paper>
    </Box>
  )
}
