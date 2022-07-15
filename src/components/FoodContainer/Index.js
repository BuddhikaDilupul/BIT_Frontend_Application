import React, { useEffect, useState } from 'react'
import {
  Wrapper,
  Card,
  CardImage,
  CardBody,
  CardTitle,
} from '../FoodContainer/FoodContainerElements'
import Grid from '@mui/material/Grid'
import ModalItem from '../../components/Modals/ItemModal'
import { Divider } from '@mui/material'
import Loader from '../Loaders/Loaders'
import { useRecoilState } from 'recoil'
import { product } from '../../atom/atoms'
function FoodList() {
  const [category, setCategoryData] = useState([])
  const [products, setProducts] = useRecoilState(product)
  const [loader, setLoader] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)

  const LoadFoodList = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    try {
      const _categoryData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/listFe`,
      )
      const _productData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/list`,
      )
      if (_categoryData.status === 200 && _productData.status === 200) {
        const categoryData = await _categoryData.json()
        const productData = await _productData.json()

        const category = categoryData.categories
        const product = productData.products
        if (category === null) {
          throw new Error()
        }
        setCategoryData(category)
        setProducts(product)

        //if (products && category) {
        setLoader(false)
      } //}
    } catch (err) {
      console.error('Error:', err)
      setLoader(false)
    }
  }

  useEffect(() => {
    LoadFoodList()
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
        justifyContent="flex-start"
      >
        <h2>Our Products</h2>
      </Grid>
      <Grid item xs={12}>
        <Wrapper>
          {category.map((item, index) => (
            <Card key={index}>
              <CardImage>
                <img
                  src={item.image}
                  alt={item.categoryName}
                  style={{ width: '100%', height: '100%' }}
                />
              </CardImage>
              <CardBody>
                <CardTitle>
                  <b>{item.categoryName}</b>
                </CardTitle>
                {/* <CardDescription>Price From</CardDescription>
                <CardPrice>{item.displayPrice}</CardPrice> */}
                <Divider />
                <ModalItem id={item._id} data={item} />
              </CardBody>
            </Card>
          ))}
        </Wrapper>
      </Grid>
    </>
  )
}

export default FoodList
