import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = ['pending', 'processing', 'shipped', 'delivered']

export default function HorizontalStepper(props) {
  const [number, setNumber] = React.useState()
  console.log(props.data)
  const setStepper = () => {
    if (props.data === steps[0]) {
      setNumber(1)
    } else if (props.data === steps[1]) {
      setNumber(2)
    } else if (props.data === steps[2]) {
      setNumber(3)
    } else if (props.data === steps[3]) {
      setNumber(4)
    }
  }
  React.useEffect(() => {
    setStepper()
  }, [])

  return (
    <Box sx={{ width: 700 }}>
      <Stepper activeStep={number} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
