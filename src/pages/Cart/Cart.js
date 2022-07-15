import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilState } from 'recoil'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Grid'
import ButtonComponent from './../../components/Buttons/Buttons'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import EditIcon from '@mui/icons-material/Edit'
import Loader from './../../components/Loaders/Loaders'
import cart from '../../components/Images/cart.png'
import { checkoutOrder, subTotalPrice } from '../../atom/atoms'
import EditCartItem from '../../components/Modals/editCartItem'
import Alerts from '../../components/Alerts/Alert'

//button props
let removeButton = {
  size: 'small',
  color: 'error',
  label: '',
  startIcon: <RemoveShoppingCartIcon size={'small'} />,
  type: 'reset',
}
let checkoutButton = {
  size: 'small',
  color: 'info',
  label: 'Next',
  startIcon: <CheckBoxIcon />,
  type: 'submit',
}
let editButton = {
  size: 'small',
  color: 'warning',
  label: '',
  startIcon: <EditIcon />,
  type: 'edit',
}
let clearCartButton = {
  size: 'small',
  color: 'error',
  label: 'Clear',
  startIcon: <RemoveShoppingCartIcon size={'small'} />,
  type: 'reset',
}
//this is cart function
function Cart() {
  const navigate = useNavigate()

  //store data in recoil state
  const [order, setOrder] = useRecoilState(checkoutOrder)
  const [subTotal, setSubTotal] = useRecoilState(subTotalPrice)
  const [isVisibleAlert, setIsVisibleAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState({
    variant: '',
    severity: 'info',
    display: '',
    message: '',
  })
  const [availableCartItem, setAvailableCartItem] = useState([
    {
      productID: '0',
      productName: 'Loading',
      quantity: 0,
    },
  ])
  const [unavailableCartItem, setUnavailableCartItem] = useState([
    {
      productID: '0',
      productName: 'Loading',
      quantity: 0,
    },
  ])
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState([])

  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [loginMessage, setLoginMessage] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const token = localStorage.getItem('authToken')
  let availableTotal = 0
  let unavailableTotal = 0
  // if (token === 'false') {
  //   navigate('/')
  // }

  const LoadCartList = async () => {
    try {
      const _cartList = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/list`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )
      if (_cartList.status !== 200) {
        navigate('/')
      }
      if (_cartList.status !== 200) {
        throw new Error()
      }

      const cartList = await _cartList.json()
      setAvailableCartItem(cartList.availableCartItem)
      setUnavailableCartItem(cartList.unavailableCartItem)
      setOrder(cartList.availableCartItem)
      setSubTotal(cartList.availableTotalPrice)
      console.log(cartList.availableTotalPrice)
      if (availableCartItem) {
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  //clear all cart data
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
        setIsLoading(false)
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
  const removeItem = async (props) => {
    console.log(props)
    const productID = props
    try {
      const _cartList = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ productID: productID }),
        },
      )
      setIsLoading(true)
      if (_cartList.status !== 200) {
        throw new Error()
      }

      const cartList = await _cartList.json()
      setResponse(cartList.updatedCart.cartItem)
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }
  const showAlert = () => {
    setIsVisibleAlert(false)
  }
  const shopCloseMessage = () => {
    setAlertMessage({
      variant: 'filled',
      severity: 'warning',
      display: 'flex',
      message: 'Our shop is Closed',
    })
    setIsVisibleAlert(true)
  }
  useEffect(() => {
    LoadCartList()
    var today = new Date()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log(time)
  }, [response])
  if (isLoading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
        <Loader />
      </Grid>
    )
  }
  if (loginMessage) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '60vh' }}
      >
        <h2>Please Login to the System</h2>
      </Grid>
    )
  }

  if (availableCartItem.length === 0 && unavailableCartItem.length === 0) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '60vh' }}
      >
        <img src={cart} alt="empty cart" />
        <p>Your Cart is Empty</p>
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
        justifyContent="flex-start"
        style={{ minHeight: 'auto', marginTop: '7rem' }}
      >
        {isVisibleAlert ? (
          <Alerts alertMessage={alertMessage} open={showAlert} />
        ) : null}
        <EditCartItem
          open={open}
          setOpen={setOpen}
          data={editItem}
          onClick={() => {
            handleClose()
          }}
          authToken={token}
        />

        {availableCartItem.length > 0 ? (
          <>
            <h3>Cart Item</h3>
            <Table sx={{ maxWidth: 600 }} aria-label="caption table">
              <caption>We will not take any order after 20:00 hrs</caption>{' '}
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Product Name</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>price</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableCartItem.map((item, index) => {
                  availableTotal += item.price * item.quantity
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.productName}
                      </TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                      <TableCell align="left">
                        {item.price * item.quantity}
                      </TableCell>
                      <TableCell>
                        <ButtonComponent
                          onClick={() => {
                            removeItem(item.productID)
                          }}
                          data={removeButton}
                        />

                        <ButtonComponent
                          style={{ position: 'sticky' }}
                          onClick={() => {
                            handleOpen()
                            setEditItem(item)
                          }}
                          data={editButton}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{availableTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <ButtonComponent
                      onClick={() => {
                        clearCart()
                      }}
                      data={clearCartButton}
                      loading={loadingButton}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <ButtonComponent
                      style={{ position: 'sticky' }}
                      onClick={() => {
                        navigate('/checkout')
                      }}
                      data={checkoutButton}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : undefined}
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '40vh', marginTop: '0.2rem' }}
      >
        {open ? (
          <EditCartItem
            open={open}
            data={editItem}
            onClick={() => {
              handleClose()
            }}
          />
        ) : undefined}

        {unavailableCartItem.length > 0 ? (
          <>
            <br />
            <br />
            <br />
            <h3> Unavailable Cart Item</h3>
            <Table
              sx={{ maxWidth: 600 }}
              style={{ backgroundColor: '#DCDFE3', color: 'white' }}
              aria-label="caption table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Product Name</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>price</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unavailableCartItem.map((item, index) => {
                  unavailableTotal += item.price * item.quantity
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.productName}
                      </TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                      <TableCell align="left">
                        {item.price * item.quantity}
                      </TableCell>
                      <TableCell>
                        <ButtonComponent
                          onClick={() => {
                            removeItem(item.productID)
                          }}
                          data={removeButton}
                        />

                        <ButtonComponent
                          style={{ position: 'sticky' }}
                          onClick={() => {
                            handleOpen()
                            setEditItem(item)
                          }}
                          data={editButton}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{unavailableTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : undefined}
      </Grid>
    </>
  )
}

export default Cart
