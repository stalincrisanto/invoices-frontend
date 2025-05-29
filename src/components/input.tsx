import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

// TODO: errors on input
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
    <Container className={className} style={{ ...sx }}>
      {label && <CustomLabel>{label}</CustomLabel>}
      <StyledTextField
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth
        error={!!errorText}
        variant="outlined"
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const CustomLabel = styled("label")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 450,
  color: theme.palette.primary.main,
  marginBottom: "4px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: 40,
    "& fieldset": {
      borderColor: "#b5b5b5",
    },
    "&:hover fieldset": {
      borderColor: "#b5b5b5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b5b5b5",
      borderWidth: "1px",
    },
  },
  "& input": {
    color: theme.palette.text.primary,
    fontSize: "15px",
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
}));

const ErrorText = styled("p")(({ theme }) => ({
  fontSize: "12px",
  marginTop: 4,
  paddingInline: 4,
  color: theme.palette.error.main,
}));

export default Input;
