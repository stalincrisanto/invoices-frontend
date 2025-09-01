import React from "react";
import TextField from "@mui/material/TextField";
import { styled, useTheme, useMediaQuery } from "@mui/material";

// TODO: errors on input
// quitar la sombre que aparece luego qe se escriba en el input
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
  fullWidth?: boolean;
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
  fullWidth = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={className} style={{ ...sx }}>
      {label && <CustomLabel>{label}</CustomLabel>}
      <StyledTextField
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth={fullWidth}
        error={!!errorText}
        variant="outlined"
        size={"small"}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));

const CustomLabel = styled("label")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 450,
  color: theme.palette.primary.main,
  marginBottom: "4px",
  [theme.breakpoints.down('sm')]: {
    fontSize: "0.7rem",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: "auto",
    minHeight: 40,
    [theme.breakpoints.down('sm')]: {
      minHeight: 36,
    },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
      padding: "8px 12px",
    },
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
  "& .MuiOutlinedInput-input": {
    [theme.breakpoints.down('sm')]: {
      padding: "8px 12px",
    },
  },
}));

const ErrorText = styled("p")(({ theme }) => ({
  fontSize: "12px",
  marginTop: 4,
  paddingInline: 4,
  color: theme.palette.error.main,
  [theme.breakpoints.down('sm')]: {
    fontSize: "11px",
    marginTop: 2,
  },
}));

export default Input;
