import React from 'react'
import Box from '@mui/material/Box'
import { Field, Form } from 'react-final-form'
import Modal from '@mui/material/Modal'
import ButtonComponent from '../Buttons/Buttons'
import SaveIcon from '@mui/icons-material/Save'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import InputBox from '../Inputbox/Inputbox'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
let saveButton = {
  size: 'small',
  color: 'success',
  label: 'save',
  startIcon: <SaveIcon />,
  type: '',
}
let cancelButton = {
  size: 'small',
  color: 'error',
  label: 'cancel',
  startIcon: <CancelPresentationIcon />,
  type: 'reset',
}
const EditCartItem = (props) => {
  const token = localStorage.getItem('authToken')
  console.log(props, 'pp')
  let formData = {
    quantity: props.data.quantity,
    productName: props.data.productName,
    productID: props.data.productID,
    stock: props.data.inStock,
  }
  const onSubmit = async (props) => {
    const productData = {
      productID: props.productID,
      quantity: props.quantity,
    }

    if (productData.quantity > 0 && productData.quantity <= formData.stock) {
      try {
        const _cartList = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}api/cart/update`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({ productData }),
          },
        )

        if (_cartList.status !== 200) {
          throw new Error()
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClick.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <Form
              onSubmit={onSubmit}
              initialValues={formData}
              validate={(values) => {
                const errors = {}
                if (values.quantity < 1) {
                  errors.quantity = 'Should be greater than 0'
                }
                if (values.quantity > formData.stock) {
                  errors.quantity = 'Requested Quantity not Available'
                }
                return errors
              }}
              render={({ handleSubmit, values }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                    >
                      <Field
                        name="productName"
                        label="Product"
                        component={InputBox}
                        value={formData.productName}
                        type="text"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Field
                        name="inStock"
                        label="Available Stock"
                        component={InputBox}
                        defaultValue={formData.stock}
                        type="text"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Field
                        name="quantity"
                        label="Select"
                        component={InputBox}
                        value={formData.quantity}
                        // validate={composeValidators(required, min, max)}
                        type="number"
                        min={1}
                        InputProps={{
                          inputProps: {
                            max: formData.stock,
                            min: 1,
                          },
                        }}
                      />
                      <ButtonComponent
                        onClick={() => onSubmit(values)}
                        data={saveButton}
                      />
                      <ButtonComponent
                        onClick={props.onClick}
                        data={cancelButton}
                      />
                      <Button />
                    </Box>
                    {/* {JSON.stringify(values, 0, 2)} */}
                  </form>
                </>
              )}
            />
          </>
        </Box>
      </Modal>
    </div>
  )
}
export default EditCartItem
