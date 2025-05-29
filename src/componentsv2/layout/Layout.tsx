import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Box>
    </>
  );
};

const Main = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 90px 0px 90px;
  @media (max-width: 768px) {
    padding: 18px 16px 16px 16px;
  }
`;

export default Layout;
