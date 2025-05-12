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
  padding: 40px 90px 0px 90px;
  @media (max-width: 768px) {
    padding: 18px 16px 16px 16px;
  }
`
const Wrapper = styled('div')`
  position: relative;
  min-height: 100vh;
  background-image: url(${BACKGROUND});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
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
  }
`

