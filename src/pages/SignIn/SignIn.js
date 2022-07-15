import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Form, Field } from 'react-final-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputBox from '../../components/Inputbox/Inputbox'
import ImageAvatars from '../../components/imageavatars/ImageAvatars'
import SendIcon from '@mui/icons-material/Send'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ButtonComponent from '../../components/Buttons/Buttons'
import Alert from '../../components/Alerts/Alert'

import { TokenCheck } from '../../components/Helpers/tokenCheck'
//validations

let resetButton = {
  size: 'small',
  color: 'error',
  label: 'Reset',
  startIcon: <RestartAltIcon />,
  type: 'reset',
}
let submitButton = {
  size: 'small',
  color: 'primary',
  label: 'Submit',
  startIcon: <SendIcon />,
  type: 'submit',
}
const Signup = () => {
  const [isVisibleAlert, setIsVisibleAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState({
    variant: '',
    severity: 'info',
    display: '',
    message: '',
  })
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const required = (value) => (value ? undefined : 'Required')

  const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )

  const valEmail = (value) =>
    value.match(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    )
      ? undefined
      : 'Invalid Email'
  const valPassword = (value) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ? undefined
      : 'Minimum eight characters, at least one letter and one number:'
  const valName = (value) =>
    value.match(/^[a-zA-Z]+$/) ? undefined : 'Invalid Name'
  const valPhone = (value) =>
    value.match(/^[0-9]{10}$/) ? undefined : 'Invalid Number'
  // const validateToken = () => {
  //   TokenCheck()
  // }
  // console.log(validateToken)
  // if (validateToken) {
  //   navigate('/')
  // }
  // if (localStorage.getItem('authToken') !== 'false') {
  //   navigate('/')
  // }
  const TokenCheck = async (successToken, unsuccessToken) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/authtoken`,
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
          return true
        } else {
          localStorage.setItem('authToken', 'null')
          return false
        }
      } catch (err) {
        console.log('Unauthorized access denied')
      }
    }
  }

  const formData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirm: '',
  }
  function refreshPage() {
    window.location.reload(false)
  }
  const showAlert = () => {
    setIsVisibleAlert(false)
  }
  const onSubmit = async (data) => {
    if (data) {
      console.log(data)
      try {
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/customer`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        )
        if (_data.status === 201) {
          setAlertMessage({
            variant: 'filled',
            severity: 'success',
            display: 'flex',
            message: 'Updated Successfully',
          })
          navigate('/signup')
          const data = await _data.json()
          const user = data.user
          if (user === null) {
            throw new Error()
          }

          setIsVisibleAlert(true)
        } else if (_data.status === 422) {
          setAlertMessage({
            variant: 'filled',
            severity: 'warning',
            display: 'flex',
            message: 'Email already exists',
          })
          setIsVisibleAlert(true)
          //setShowAlert(true)
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token !== 'null') {
      TokenCheck()
    } else {
      setLoader(false)
    }
  }, [])
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '50vh' }}
    >
      {isVisibleAlert ? (
        <Alert alertMessage={alertMessage} open={showAlert} />
      ) : null}

      <Grid item xs={12} md={6} justifyContent="center">
        <ImageAvatars />

        <Form
          onSubmit={onSubmit}
          initialValues={formData}
          validate={(values) => {
            const errors = {}
            if (values.password !== values.confirm) {
              errors.confirm = 'Password must be matched'
            }

            return errors
          }}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
              >
                <label>
                  <b>Full Name</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="firstName"
                      label="First Name"
                      component={InputBox}
                      value="firstName"
                      validate={composeValidators(required, valName)}
                      type="search"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="lastName"
                      label="Last Name"
                      component={InputBox}
                      value="lastName"
                      validate={composeValidators(required, valName)}
                      type="search"
                    />
                  </Grid>
                </Grid>
                <label>
                  <b>Contact Details</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="email"
                      label="Email Address"
                      component={InputBox}
                      value="email"
                      validate={composeValidators(required, valEmail)}
                      type="search"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="phoneNumber"
                      label="Phone Number"
                      component={InputBox}
                      value="phoneNumber"
                      validate={composeValidators(
                        required,
                        valPhone,
                        mustBeNumber,
                      )}
                      type="search"
                    />
                  </Grid>
                </Grid>
                <label>
                  <b>Default Shipping Address</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Field
                      name="address"
                      label="Home Address"
                      component={InputBox}
                      value="address"
                      validate={required}
                      type="search"
                    />
                  </Grid>
                </Grid>
                <label>
                  <b>Password</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="password"
                      label="Password"
                      component={InputBox}
                      value="password"
                      validate={composeValidators(required, valPassword)}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="confirm"
                      label="Confirm Password"
                      component={InputBox}
                      value="confirmPassword"
                      validate={composeValidators(required, valPassword)}
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Grid
                container
                direction="row-reverse"
                alignItems="flex-end"
                justifyContent="flex-start"
              >
                <Grid>
                  <ButtonComponent
                    onClick={() => {
                      onSubmit()
                    }}
                    data={submitButton}
                  />
                </Grid>
                <Grid>
                  <ButtonComponent
                    onClick={() => {
                      refreshPage()
                    }}
                    data={resetButton}
                  />
                </Grid>
              </Grid>
              {/* {JSON.stringify(values, 0, 2)} */}
            </form>
          )}
        />
      </Grid>
    </Grid>
  )
}

export default Signup
