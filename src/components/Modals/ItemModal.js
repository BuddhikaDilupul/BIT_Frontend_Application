import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useRecoilValue } from 'recoil'
import { product } from '../../atom/atoms'
import { Grid, MenuItem } from '@mui/material'
import InputBox from './../Inputbox/Inputbox'
import { Field, Form } from 'react-final-form'
import ButtonComponent from '../Buttons/Buttons'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Alerts from '../Alerts/Alert'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import InventoryIcon from '@mui/icons-material/Inventory'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
  '@media screen and (max-width: 600px)': {
    textAlign: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
  },
}

let addToCartButton = {
  size: 'small',
  color: 'primary',
  label: 'Add To Cart',
  startIcon: <AddShoppingCartIcon />,
  type: 'submit',
}
let selectNewProductButton = {
  size: 'small',
  color: 'primary',
  label: 'Select new Item',
  // startIcon: <AddShoppingCartIcon />,
  type: 'reset',
}

export default function BasicModal(props) {
  const productData = useRecoilValue(product)
  const [products, setProducts] = useState([])
  const [reset, setReset] = useState(false)
  const [price, setPrice] = useState(0)
  const [available, setAvailable] = useState(null)
  const [quantity, setQuantity] = useState(0)

  const [isVisibleAlert, setIsVisibleAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    severity: 'warning',
    message: '',
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = (props) => {
    setAvailable(null)
    setPrice(0)
    setQuantity(0)
    setOpen(false)
    setIsVisibleAlert(false)
  }
  let formData = {
    productID: '',
    quantity: '',
  }

  let isLoggedIn = localStorage.getItem('isLoggedIn')

  //validation
  const required = (value) => (value ? undefined : 'Required')
  const min = (value) => (value <= 0 ? 'Must be greater than 0' : undefined)
  const max = (value) =>
    value > available ? 'Please select available quantity' : undefined
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )

  //price format
  function ccyFormat(num) {
    return `${num.toFixed(2)}`
  }
  const onSubmit = async (data) => {
    const newProduct = data
    if (data.quantity <= available) {
      try {
        const _data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('authToken'),
          },
          body: JSON.stringify(newProduct),
        })
        console.log(_data.status, 'awa')
        if (_data.status === 200) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'success',
            message: 'Item added',
          })
        } else if (_data.status === 422) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Item Already exist in your cart.',
          })
        } else if (_data.status === 404) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Sorry. We are having some issue',
          })
        } else if (_data.status === 403) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Quantity not available',
          })
        } else if (_data.status === 401) {
          setIsVisibleAlert(true)
          setAlertMessage({
            severity: 'warning',
            message: 'Please Log into the System',
          })
        }
      } catch (err) {
        setIsVisibleAlert(true)
        setAlertMessage({
          severity: 'warning',
          message: 'server error',
        })
        // console.error('Error:', err)
      }
    }
  }
  console.log(products)
  const showAlert = () => {
    setIsVisibleAlert(false)
  }
  useEffect(() => {
    productData.map((item, index) =>
      item.category_id._id === props.id ? products.push(item) : null,
    )
  }, [])
  return (
    <div>
      <Button onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isVisibleAlert ? (
            <Alerts alertMessage={alertMessage} onClick={showAlert} />
          ) : undefined}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={props.data.image}
              alt={props.data.categoryName}
              style={{ width: '200px', height: '150px', alignItems: 'center' }}
            />
            <br />
          </Grid>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>{props.data.categoryName}</b>
            <br />
            {available === 0 ? 'out of Stocks' : undefined}
            {available > 0 && available !== null ? (
              <Badge badgeContent={available} color="success">
                <h5>in stock</h5>
              </Badge>
            ) : undefined}
            {/* Availability: */}
          </Typography>

          {isLoggedIn !== 'null' ? (
            <Form
              onSubmit={onSubmit}
              initialValues={formData}
              //validate={validate}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                  >
                    {quantity * price && quantity > 0 ? 'LKR ' : null}
                    {quantity * price && quantity > 0
                      ? ccyFormat(quantity * price)
                      : null}
                    <Grid
                      item
                      xs={10}
                      style={{ marginLeft: '1rem' }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Field
                        name="productID"
                        label="Select Product"
                        select
                        component={InputBox}
                        value={formData.productID}
                        validate={required}
                        type="text"
                      >
                        {products.map((option) => (
                          <MenuItem
                            key={option._id}
                            value={option._id}
                            onClick={() => {
                              setPrice(option.price)
                              setAvailable(option.inStock)
                            }}
                          >
                            <span>{option.productName}</span>
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={5} style={{ marginLeft: '1rem' }}>
                      <Field
                        name="quantity"
                        label="Select"
                        component={InputBox}
                        defaultValue={0}
                        value={formData.quantity}
                        validate={composeValidators(required, min, max)}
                        InputProps={{
                          inputProps: {
                            max: available,
                            min: 1,
                          },
                        }}
                        type="number"
                        onClick={(e) => setQuantity(e.target.value)}
                      ></Field>
                    </Grid>
                  </Box>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isVisibleAlert ? (
                      <ButtonComponent
                        onClick={() => {
                          handleClose()
                        }}
                        data={selectNewProductButton}
                      />
                    ) : (
                      <ButtonComponent data={addToCartButton} />
                    )}
                  </Grid>
                  {/* {JSON.stringify(values, 0, 2)} */}
                </form>
              )}
            />
          ) : (
            <div>
              {products.map((option) => (
                <ul>
                  <li>{option.productName} </li>
                  <span> LKR {ccyFormat(option.price)}</span>
                </ul>
              ))}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
