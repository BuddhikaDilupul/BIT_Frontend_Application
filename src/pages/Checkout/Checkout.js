import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TokenCheck } from '../../components/Helpers/tokenCheck'
import Grid from '@mui/material/Grid'
import ButtonComponent from './../../components/Buttons/Buttons'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import Loader from './../../components/Loaders/Loaders'
import { Form, Field } from 'react-final-form'
import Box from '@mui/material/Box'
import InputBox from '../../components/Inputbox/Inputbox'
import ThanYouModal from '../../components/Modals/ThankYouModal'
import Alerts from '../../components/Alerts/Alert'
import { useRecoilValue } from 'recoil'
import { checkoutOrder, subTotalPrice } from '../../atom/atoms'
import { MenuItem, Select } from '@mui/material'

let checkoutButton = {
  size: 'small',
  color: 'info',
  label: 'Confirm',
  startIcon: <DoneAllIcon />,
  type: 'submit',
}

//validations
const required = (value) => (value ? undefined : 'Required')
const mustBeNumber = (value) => (isNaN(value) ? 'Must be a number' : undefined)
const mustBeCharacter = (value) =>
  isNaN(value) ? 'Must be a number' : undefined
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

function Checkout() {
  const navigate = useNavigate()
  const [location, setLocation] = useState([])
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleAlert, setIsVisibleAlert] = useState(false)
  const [setDeliveryCharges, deliveryCharges] = useState(10)
  const [customerData, setCustomerData] = useState({
    name: '',
    phoneNumber: '',
    shippingAddress: '',
  })
  const [alertMessage, setAlertMessage] = useState({
    severity: 'warning',
    message: '',
  })
  let charges = 0
  const [loadingButton, setLoadingButton] = useState(false)
  const [city, setCity] = useState()
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('authToken')
  const orderData = useRecoilValue(checkoutOrder)
  const subTotal = useRecoilValue(subTotalPrice)

  //TokenCheck()
  const formData = {
    receiverName: customerData.firstName,
    shippingAddress: customerData.address,
    phoneNumber: customerData.phoneNumber,
    landmark: ' ',
  }
  if (token === 'false') {
    navigate('/')
  }
  const clearCart = async () => {
    try {
      setLoadingButton(true)
      const _cartList = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/clear`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )

      if (_cartList.status !== 200) {
        setResponse(_cartList.status)
        throw new Error()
      }

      const cartList = await _cartList.json()
      setResponse(cartList.updatedCart.cartItem)
      if (cartList) {
        setLoadingButton(false)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  const LoadOrderItem = async () => {
    try {
      const _deliveryLocationDetails = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/delivery/location`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )

      const _customerDetails = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/customer/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )
      const customerDetails = await _customerDetails.json()
      setCustomerData(customerDetails.customer)

      const deliveryLocationDetails = await _deliveryLocationDetails.json()
      setLocation(deliveryLocationDetails.cities)

      if (customerData && location) {
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  useEffect(() => {
    var today = new Date()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log(time)
    if (time > '20:00:00' || time < '08:00:00') {
      // navigate('/cart')
    }
    LoadOrderItem()
    // if (new DateTime())
    if (orderData.length === 0) {
      navigate('/cart')
    }
  }, [response])

  if (isLoading === true || orderData === '') {
    if (orderData === '') {
      navigate('/cart')
    }
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '60vh' }}
      >
        <Loader />
      </Grid>
    )
  }

  const showAlert = () => {
    setIsVisibleAlert(false)
    navigate('/cart')
  }
  const onSubmit = async (data) => {
    const token = localStorage.getItem('authToken')
    if (data) {
      console.log({ data, orderData })
      try {
        setLoadingButton(true)
        const _data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/order`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({ data, orderData }),
          },
        )
        if (_data.status === 201) {
          const order1 = await _data.json()
          console.log(order1.order, 'kkkk')
          clearCart()
          setOpen(true)
          setLoadingButton(false)
        } else if (_data.status === 400) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Sorry.. Some products are not available 😥',
          })
          setLoadingButton(false)
        }
      } catch (err) {
        setIsVisibleAlert(true)
        setAlertMessage({
          severity: 'warning',
          message: 'Internal Server Error',
        })
        setLoadingButton(false)
        console.error('Error:', err)
      }
    }
  }
  return (
    <>
      {open ? <ThanYouModal /> : null}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{
          minHeight: '60vh',
          marginTop: '3rem',
        }}
      >
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
                  '& .MuiTextField-root': { m: 1, width: 200 },
                }}
              >
                <label>
                  <b>Contact Details</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="receiverName"
                      label="Receiver Name"
                      component={InputBox}
                      value="receiverName"
                      validate={required}
                      type="search"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="phoneNumber"
                      label="Phone Number"
                      component={InputBox}
                      value="phoneNumber"
                      validate={composeValidators(required, mustBeNumber)}
                      type="search"
                    />
                  </Grid>
                </Grid>
                <br />
                <label>
                  <b>Shipping Address Details</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="shippingAddress"
                      label="Receiver address"
                      component={InputBox}
                      value="shippingAddress"
                      validate={required}
                      type="search"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="landmark"
                      label="Landmark"
                      component={InputBox}
                      value="landmark"
                      type="search"
                    />
                  </Grid>
                </Grid>
                <label>
                  <b>Delivery Locations</b>
                </label>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="city"
                      label="Select City"
                      select
                      component={InputBox}
                      value={city}
                      validate={required}
                      type="select"
                    >
                      {location.map((item, index) => {
                        return (
                          <MenuItem
                            key={item._id}
                            value={item._id}
                            onClick={() => (charges = item.price)}
                          >
                            <span>{item.city}</span>
                          </MenuItem>
                        )
                      })}
                    </Field>
                  </Grid>
                </Grid>
              </Box>
              <Table
                sx={{ minWidth: 100, maxWidth: 400 }}
                aria-label="caption table"
                style={{ marginLeft: 7 }}
              >
                {/* <caption>A basic table example with a caption</caption> */}
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <b>Product Name</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Price</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Total Price</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.map((item, index) => {
                    let subprice = item.quantity * item.price
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.productName}
                        </TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{subprice}</TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow>
                    <TableCell>
                      <b>Sub Total</b>
                    </TableCell>{' '}
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">{subTotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Delivery Charges</b>
                    </TableCell>{' '}
                    <TableCell></TableCell> <TableCell></TableCell>
                    <TableCell align="right">{charges}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Total</b>
                    </TableCell>{' '}
                    <TableCell></TableCell> <TableCell></TableCell>
                    <TableCell align="right">
                      {Number(charges) + subTotal}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <ButtonComponent
                        onClick={() => {
                          onSubmit()
                        }}
                        data={checkoutButton}
                        loading={loadingButton}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </form>
          )}
        />
      </Grid>
    </>
  )
}

export default Checkout
