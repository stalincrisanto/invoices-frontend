import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";

interface Props {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  errorText?: string;
}
//TODO:
// - add styles for focus and hover states
// - al momento de abrir el calendario, la pantalla se agranda
// - agregar un botón de limpiar los datos
// - agregar un loader para la generación del pdf

const DateInput: React.FC<Props> = ({ label, value, onChange, errorText }) => {
  return (
    <Container>
      {label && <CustomLabel>{label}</CustomLabel>}
      <DatePicker
        format="DD-MM-YYYY"
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            error: !!errorText,
            placeholder: "Selecciona una fecha",
            InputProps: {
              sx: {
                height: 40,
              },
            },
          },
          popper: {
            sx: {
              // Aplica el estilo al contenedor del calendario
              // "& .MuiCalendarOrClockPicker-root": {
              //   maxHeight: 50, // o cualquier altura deseada
              //   // overflowY: "auto",
              // },
              // "& .MuiDayCalendar-monthContainer": {
              //   maxHeight: 150,
              //   // overflowY: "auto",
              // },
            },
          },
        }}
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

const ErrorText = styled("p")(({ theme }) => ({
  fontSize: "12px",
  marginTop: 4,
  paddingInline: 4,
  color: theme.palette.error.main,
}));

export default DateInput;
