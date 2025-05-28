import React from "react";
import { styled } from "@mui/system";

const Title = ({ title }: { title: string }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export const StyledTitle = styled("div")({
  height: "33px",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "32px",
  lineHeight: "28px",
  alignItems: "center",
  marginBottom: "30px",
});

export default Title;
