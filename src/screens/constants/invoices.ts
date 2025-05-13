export const columnsTable = [
  {
    id: "chs_data_dat",
    label: "Fecha",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  { id: "cashmov_des", label: "Descripción" },
  {
    id: "for_amt",
    label: "Monto",
    render: (value: string) => `$${parseFloat(value).toFixed(2)}`,
  },
];
