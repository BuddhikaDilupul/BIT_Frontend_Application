import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Field, Form } from 'react-final-form'
import InputBox from './../../components/Inputbox/Inputbox'
import Alerts from '../../components/Alerts/Alert'
import Box from '@mui/material/Box'
import ButtonComponent from '../../components/Buttons/Buttons'
//import { TokenCheck } from '../../components/Helpers/tokenCheck'
import Loader from '../../components/Loaders/Loaders'
let submitButton = {
  size: 'small',
  color: 'primary',
  label: 'Submit',
  startIcon: <SendIcon />,
  type: 'submit',
}
//validations
const required = (value) => (value ? undefined : 'Required')

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const valEmail = (value) =>
  value.match(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  )
    ? undefined
    : 'Invalid Email'
function refreshPage() {
  window.location.reload()
}
const ResetPassword = () => {
  const [isVisibleAlert, setIsVisibleAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState({
    variant: '',
    severity: 'info',
    display: '',
    message: '',
  })
  const formData = {
    email: '',
  }
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    if (data) {
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/reset/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ',
            },
            body: JSON.stringify(data),
          },
        )
        if (_data.status === 200) {
          navigate('/signup')
          refreshPage()
        } else if (_data.status === 500) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'We are having some issue',
          })
        } else if (_data.status === 404) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Email not found',
          })
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  const TokenCheck = async () => {
    const token = localStorage.getItem('authToken')
    if (token !== 'null') {
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/authToken`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        )
        if (_data.status === 200) {
          navigate('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  const showAlert = () => {
    setIsVisibleAlert(false)
  }
  useEffect(() => {
    TokenCheck()
  }, [])

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
        <Card
          style={{
            width: '20rem',
            borderRadius: '10px',
            boxShadow: '0 0 0.2px 2px',
          }}
        >
          {isVisibleAlert ? (
            <Alerts alertMessage={alertMessage} open={showAlert} />
          ) : null}
          <div style={{ margin: '1rem' }}>
            <h2 style={{ textAlign: 'center' }}>Reset your Password</h2>
          </div>
          <Form
            onSubmit={onSubmit}
            initialValues={formData}
            //validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                >
                  <Grid item xs={10} style={{ marginLeft: '1rem' }}>
                    <Field
                      name="email"
                      label="Email Address"
                      component={InputBox}
                      value="email"
                      validate={composeValidators(required, valEmail)}
                      type="search"
                      color="warning"
                      helperText="*Your new password will be sent to your email. Please reset in your first logging"
                    />
                  </Grid>
                </Box>
                <Grid
                  container
                  direction="row-reverse"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                >
                  <Grid style={{ marginRight: '2rem', marginBottom: '1rem' }}>
                    <ButtonComponent
                      onClick={() => {
                        onSubmit()
                      }}
                      data={submitButton}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Card>
      </Grid>
    </>
  )
}

export default ResetPassword
