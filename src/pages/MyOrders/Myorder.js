import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loaders/Loaders'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
  Container,
  LeftContainer,
  LeftContainerHeader,
  MiddleContainer,
  MiddleContainerHeader,
  RightContainer,
} from './orderLayout'
import HorizontalStepper from './../../components/Stepper/Stepper'

function ccyFormat(num) {
  return `${num.toFixed(2)}`
}

const MyOrder = (props) => {
  const [orderDetails, setOrderDetails] = useState()
  const [orderItems, setOrderItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem('authToken')
  const orderID = useParams()
  const navigate = useNavigate()
  const LoadOrder = async () => {
    try {
      const _orderList = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/myorder/` + orderID.id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )
      if (_orderList.status === 401) {
        navigate('/')
      }
      if (_orderList.status !== 200) {
        throw new Error()
      }

      console.log(_orderList.status)
      const orderList = await _orderList.json()
      console.log(orderList.order)
      setOrderDetails(orderList.order)
      setOrderItems(orderList.order.orderItem)
      if (orderList) setIsLoading(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  useEffect(() => {
    LoadOrder()
  }, [])
  if (isLoading) {
    return (
      <>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '2rem' }}
          minHeight="40vh"
        >
          <Loader />
        </Grid>
      </>
    )
  }
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <h2>
          <b>Your Order Details</b>
        </h2>
      </Grid>
      {orderDetails.status !== 'cancelled' ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          // style={{ minWidth: '100%' }}
        >
          <Box sx={6}>
            <Item>
              <HorizontalStepper data={orderDetails.status} />
            </Item>
          </Box>
        </Grid>
      ) : null}
      {orderDetails.status === 'cancelled' ? (
        <Grid
          item
          xs={7.5}
          md={10}
          lg={11}
          sm={9.5}
          style={{ marginTop: '6rem', marginLeft: '5rem', textAlign: 'center' }}
        >
          <h4>Order Status:{orderDetails.status}</h4>
        </Grid>
      ) : null}
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Grid
          minHeight="40vh"
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '2rem' }}
          container
          spacing={2}
        >
          <Grid item xs={{ width: 'auto' }} style={{ marginBottom: '1rem' }}>
            {/* <Item> */}
            <Table
              border={2}
              sx={{ minWidth: 700 }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow
                  style={{ backgroundColor: '#DCDFE3', color: 'white' }}
                >
                  <TableCell align="center" colSpan={2}>
                    <h3> Shipping Details</h3>
                  </TableCell>
                </TableRow>
                <TableRow style={{ color: '#DCDFE3' }}>
                  <TableCell align="left">
                    <b>Order ID</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>{orderDetails.orderNumber}</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Receiver Name</b>
                  </TableCell>
                  <TableCell align="left">
                    {orderDetails.receiverName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Shipping Address</b>
                  </TableCell>
                  <TableCell align="left">
                    {orderDetails.shippingAddress}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <b>Contact No</b>
                  </TableCell>
                  <TableCell align="left">{orderDetails.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell align="left">
                    {orderDetails.dateOrder.slice(0, 10)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* </Item> */}
          </Grid>
        </Grid>
        <Grid
          minHeight="10vh"
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '2rem' }}
          container
          spacing={2}
        >
          <Grid item xs={'auto'}>
            {/* <Item> */}
            <Table
              border={2}
              sx={{ minWidth: 700 }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow
                  style={{ backgroundColor: '#DCDFE3', color: 'white' }}
                >
                  <TableCell align="center" colSpan={3}>
                    <h3>Details</h3>
                  </TableCell>
                  <TableCell align="center">
                    <h3>Price</h3>
                  </TableCell>
                </TableRow>
                <TableRow style={{ color: '#DCDFE3' }}>
                  <TableCell align="left">
                    <b>Product Name</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Qty.</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Unit</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Sum</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.product.productName}
                      </TableCell>
                      <TableCell align="left">
                        {ccyFormat(item.quantity)}
                      </TableCell>
                      <TableCell align="right">
                        LKR {ccyFormat(item.product.price)}
                      </TableCell>
                      <TableCell align="right">
                        LKR {ccyFormat(item.product.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell>
                    <b>Sub Total</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    LKR {ccyFormat(orderDetails.subTotalPrice)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Delivery Fee</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    LKR {ccyFormat(orderDetails.city.price)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    LKR{' '}
                    {ccyFormat(
                      orderDetails.subTotalPrice + orderDetails.city.price,
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>{' '}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '60vh', marginTop: '3rem' }}
      >
        <Paper
          sx={{
            // width: '100%',
            overflow: 'hidden',
            width: '100%',
            '@media (min-width: 780px)': {
              width: '60%',
            },
          }}
        ></Paper>
      </Grid>
    </>
  )
}

export default MyOrder
