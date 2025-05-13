import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  sx?: object;
}

const ButtonComponent: React.FC<ButtonProps> = ({ label, onClick, color = "primary", sx }) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{ marginTop: 2, ...sx }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;