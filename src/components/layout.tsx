import styled from '@emotion/styled'
import { Header } from './header'
import { BACKGROUND, BACKGROUND_TOP } from './../utils/config/constants'
import Footer from './footer'

export const Layout = ({ children }: any) => {
  return (
    <>
      <Wrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  )
}

const Main = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 90px 0px 90px;
  
  @media (max-width: 1200px) {
    padding: 32px 60px 0px 60px;
  }
  
  @media (max-width: 992px) {
    padding: 24px 40px 0px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 20px 24px 0px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 16px 0px 16px;
  }
`

const Wrapper = styled('div')`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-image: url(${BACKGROUND});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  
  @media (max-width: 768px) {
    background-size: cover;
  }
  
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${BACKGROUND_TOP});
    background-size: contain;
    background-repeat: repeat;
    background-position: center top;
    opacity: 1;
    z-index: -10;
    
    @media (max-width: 768px) {
      background-size: cover;
    }
  }
`

