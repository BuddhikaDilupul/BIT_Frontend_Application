import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import Loader from '../Loaders/Loaders'

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        bgcolor: '#232a34',
        color: 'white',
        p: 2,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        minWidth: '2rem',
        ...sx,
        ' @media screen and (min-width: 700px)': {
          minWidth: '20rem',
        },
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default function CategoryItems() {
  const [category, setCategoryData] = useState([])
  const [loader, setLoader] = useState(true)
  const handleLoadCategory = async () => {
    try {
      const _data = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/list`,
      )
      if (_data.status !== 200) {
        throw new Error()
      }

      const data = await _data.json()
      const category = data.categories
      console.log('hello', category, loader)
      if (category === null) {
        throw new Error()
      }
      await setCategoryData(category)
      // dispatch({ type: 'categories', categoryData: category })
      setLoader(false)
    } catch (err) {
      console.error('Error:', err)
    }
  }
  // const categoryData = useSelector((state) => state.categoryData)
  // console.log(categoryData, 'categoryData')
  useEffect(() => {
    handleLoadCategory()
  }, [])
  if (loader) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Loader />
      </Grid>
    )
  }
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-around',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 50px)',
          gap: 1,
        }}
      >
        {category.map((option) => (
          <Item
            key={option._id}
            value={option._id}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              alert('hi')
            }}
          >
            {option.categoryName}
          </Item>
        ))}
      </Box>
    </div>
  )
}
