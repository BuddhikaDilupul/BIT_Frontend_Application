import { atom } from 'recoil'

const product = atom({
  key: 'product', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
const checkoutOrder = atom({
  key: 'checkoutOrder', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
 })
 const subTotalPrice = atom({
  key: 'subTotal', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
 })
export {product ,subTotalPrice,checkoutOrder}
