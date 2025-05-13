import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { GREY } from "@/utils/config/theme";

const DateTimePicker = ({ label, value, onChange }: Props) => {
  return (
    <>
      <DatePicker
        label={label}
        format="DD-MM-YYYY"
        value={value}
        onChange={onChange}
        sx={{ width: 1 / 1, background: GREY, borderColor: "red" }}
      />
    </>
  );
};

export default DateTimePicker;

interface Props {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}
