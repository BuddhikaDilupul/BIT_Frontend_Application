import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 'auto';
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`

export const LeftContainer = styled.div`
  display: flex;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  flex-direction: column;
  flex-grow: 4;
`

export const RightContainer = styled.div`
  display: flex;
  padding: 1rem;
  display: flex;
  margin-top: 1rem;
  margin-bottom: 'auto';
  margin-right: 2rem;
`

export const LeftContainerHeader = styled.div`
  display: flex;
  flex-grow: 4;
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-left: 4rem;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`

export const RightContainerHeader = styled.div`
  display: flex;
  flex-grow: 4;
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-left: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
