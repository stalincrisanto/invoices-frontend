import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  sx?: object;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "primary",
  sx,
  disabled = false,
  size = "medium",
}) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{ marginTop: 2, ...sx }}
      fullWidth={false}
      disabled={disabled}
      size={size}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
