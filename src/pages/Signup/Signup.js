import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Field, Form } from 'react-final-form'
import InputBox from './../../components/Inputbox/Inputbox'
import Box from '@mui/material/Box'
import ButtonComponent from '../../components/Buttons/Buttons'
//import { TokenCheck } from '../../components/Helpers/tokenCheck'
import Loader from '../../components/Loaders/Loaders'
import Alerts from '../../components/Alerts/Alert'
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
function SignIn() {
  const [loader, setLoader] = useState(false)
  const [isVisibleAlert, setIsVisibleAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    severity: 'warning',
    message: '',
  })
  const formData = {
    email: '',
    password: '',
  }
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    if (data) {
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/customer/login`,
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
          const data = await _data.json()
          const customerData = data.customer
          const token = data.token
          const user = customerData.firstName
          localStorage.setItem('authToken', token)
          localStorage.setItem('isLoggedIn', true)
          refreshPage()
        } else if (_data.status === 500) {
          console.log('500')
        } else if (_data.status === 422) {
          console.log('422')
        } else if (_data.status === 404) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Please enter valid Email and password',
          })
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  const showAlert = () => {
    setIsVisibleAlert(false)
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
          setLoader(false)
          console.log(_data)
          return true
        } else {
          setLoader(false)
          console.log(_data.status)
        }
      } catch (err) {
        console.log(err, 'Unauthorized access denied')
      }
    } else {
      setLoader(false)
    }
  }
  useEffect(() => {
    TokenCheck()
  }, [])
  if (loader) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
        {' '}
        <Loader />
      </Grid>
    )
  }
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
          <div style={{ margin: '1rem' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
          </div>
          {isVisibleAlert ? (
            <Alerts alertMessage={alertMessage} onClick={showAlert} />
          ) : undefined}
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
                      // onChange={(e) => {
                      //   setEmail(e.target.value)
                      // }}
                      validate={composeValidators(required, valEmail)}
                      type="search"
                    />
                  </Grid>

                  <Grid item xs={10} style={{ marginLeft: '1rem' }}>
                    <Field
                      name="password"
                      label="Password"
                      component={InputBox}
                      value="password"
                      // onChange={(e) => {
                      //   setPassword(e.target.value)
                      // }}
                      validate={required}
                      type="password"
                    />
                  </Grid>
                </Box>
                <h6
                  style={{
                    marginLeft: '1rem',
                    cursor: 'pointer',
                    color: '#E06B2F',
                  }}
                  onClick={() => navigate('/reset')}
                >
                  Forgot password?
                </h6>
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

export default SignIn
