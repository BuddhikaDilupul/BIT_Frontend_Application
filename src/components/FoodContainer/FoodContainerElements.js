import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  grid-template-columns: 1fr;
  justify-content: center;
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 16rem));
  }
`

export const Card = styled.div`
  box-shadow: 0 0 0.2px 5px;
  min-width: 20rem;
  display: flex;
  margin: 20px;
  border-radius: '50px';
  @media screen and (min-width: 600px) {
    flex-direction: column;
    text-align: center;
    min-width: 20rem;
    border-radius: '50px';
  }
`
export const CardImage = styled.div`
  width: 20rem;
  height: 12.5rem;
  object-fit: cover;
  @media screen and (min-width: 600px) {
    width: 20rem;
    height: 15rem;
  }
`
export const CardBody = styled.div`
  margin: 1rem;
`
export const CardTitle = styled.div`
  line-height: 1.4rem;
  margin-bottom: 0.5rem;
`
export const CardDescription = styled.div`
  line-height: 1.2rem;
`
export const CardPrice = styled.div`
  font-size: 1.4rem;
  margin-top: 0.6rem;
  &::before {
    content: 'Rs';
    font-size: 1rem;
    position: relative;
    top: -0.3rem;
    padding: 0.1rem;
  }
`
export const CardButton = styled.div`
  border: none;
  border-top: 1px solid grey;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  color: inherit;
  width: 100%;
  padding-top: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    color: #0fb36d;
  }
`
