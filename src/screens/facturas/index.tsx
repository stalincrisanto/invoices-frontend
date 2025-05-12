import DateTimePicker from "@/components/dateTimePicker";
import Title from "@/components/title";
import React from "react";

const FacturasMain = () => {
  return (
    <>
      <Title title="Consulta de facturas" />
      <DateTimePicker label="Desde"/>
    </>
  );
};

export default FacturasMain;

// import dayjs from "dayjs";
// import { useState } from "react";
// import getValidationTicket from "@/src/apiCalls/getValidationTicket";
// import getValidationsByPeriod from "@/src/apiCalls/getValidationsByPeriod";
// import DateRangePicker from "@/src/components/dateRangePicker";
// import Table from "@/src/components/genericos/table";
// import { Message, Title } from "../perfil/datosPersonales";

//   const { user, token } = useAppContext();
//   const { t } = useTranslation();
//   const [submitted, setSubmitted] = useState<Boolean>(false);
//   const [validations, setValidations] = useState([]);
//   const [error, setError] = useState("");
//   const cabecera = [
//     t("validaciones.tabla.fecha_val"),
//     t("validaciones.tabla.n_validacion"),
//     t("validaciones.tabla.medio_transporte"),
//     t("validaciones.tabla.medio_acceso"),
//     t("validaciones.tabla.linea"),
//     t("validaciones.tabla.estacion"),
//     t("validaciones.tabla.sentido"),
//     t("validaciones.tabla.importe"),
//   ];

//   const openTicket = async (index: number) => {
//     getValidationTicket(token, validations[index])
//       .then((response) => {
//         const file = window.URL.createObjectURL(response.data)
//         window.open(file)
//       })
//       .catch((x) => setError(x))
//   }

{
  /* <DateRangePicker
        onSubmit={async (dateRange: { startDate: any; endDate: any }) => {
          const { startDate, endDate } = dateRange;
          const formatedStartDate = dayjs(startDate)
            .tz("America/Guayaquil")
            .format("DD-MM-YYYY");
          const formatedEndDate = dayjs(endDate)
            .tz("America/Guayaquil")
            .format("DD-MM-YYYY");
          const result = await getValidationsByPeriod(
            token,
            formatedStartDate,
            formatedEndDate
          );
          setValidations(result.data.validations);
          setSubmitted(true);
        }}
      /> */
}
{
  /* {validations.length > 0 ? (
        <>
          <Table
            headers={cabecera}
            title={"Validaciones"}
            data={validations}
            actionButton={openTicket}
            type={"validation"}
          />
        </>
      ) : submitted ? (
        <Message>No hay datos</Message>
      ) : null} */
}

// ----------------------------------------------------------------------
// ------------------------VERSION 2-------------------------------------
// ----------------------------------------------------------------------

// import { useState } from "react";
// import { Box, Stack, TextField, Button, Paper } from "@mui/material";
// import Title from "@/components/title";

// const FacturasMain = () => {
//   const [documentId, setDocumentId] = useState("");
//   const [dateStart, setDateStart] = useState("");
//   const [dateEnd, setDateEnd] = useState("");

//   const handleSearch = () => {
//     if (!documentId || !dateStart || !dateEnd) {
//       alert("Por favor, completa todos los campos.");
//       return;
//     }

//     console.log({ documentId, dateStart, dateEnd });
//   };

//   return (
//     <Box position="relative" zIndex={10}>
//       <Title title="Consulta de facturas" />

//       <Paper sx={{ mt: 4, p: 3 }}>
//         <Stack
//           direction="row"
//           spacing={2}
//           alignItems="center"
//           useFlexGap
//           flexWrap="wrap"
//         >
//           <TextField
//             label="Cédula"
//             value={documentId}
//             onChange={(e) => setDocumentId(e.target.value)}
//             required
//             sx={{ width: 200 }}
//           />
//           <TextField
//             label="Fecha de inicio"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={dateStart}
//             onChange={(e) => setDateStart(e.target.value)}
//             required
//             sx={{ width: 200 }}
//           />
//           <TextField
//             label="Fecha de fin"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={dateEnd}
//             onChange={(e) => setDateEnd(e.target.value)}
//             required
//             sx={{ width: 200 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSearch}
//             sx={{ height: 56, minWidth: 140 }}
//           >
//             Buscar
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default FacturasMain;
