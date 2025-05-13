import React from "react";
import TextField from "@mui/material/TextField";
import { ERROR, GREY } from "@/utils/config/theme";
import { styled } from "@mui/material";

interface InputProps {
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  sx?: object;
  errorText?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  label = "",
  sx = {},
  errorText = "",
}) => {
  return (
    <>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        className={className}
        disabled={disabled}
        fullWidth
        sx={{ backgroundColor: GREY, borderColor: "red", ...sx }}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </>
  );
};

const ErrorText = styled("p")((props: any) => ({
  fontSize: "12px",
  marginTop: 4,
  paddingInline: 4,
  color: ERROR,
}));

export default Input;
