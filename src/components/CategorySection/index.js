import React from 'react'
import CategoryItems from './Box'
import { CategoryWrapper, Wrapper } from './CategorySectionElements'

function CategorySection() {
  return (
    <>
      <CategoryWrapper>
        <Wrapper>
          Categories
          <CategoryItems />
        </Wrapper>
      </CategoryWrapper>
    </>
  )
}

export default CategorySection
