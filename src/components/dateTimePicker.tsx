import React, { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const DateTimePicker = ({ label }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(null);
  
  return (
    <>
        <DatePicker
          label={label}
          format="DD-MM-YYYY"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
    </>
  );
};

export default DateTimePicker;

interface Props {
  label: string;
}
