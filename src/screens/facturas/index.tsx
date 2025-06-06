import DateTimePicker from "@/components/dateTimePicker";
import Input from "@/components/input";
import ButtonComponent from "@/components/button";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { getInvoices } from "@/services/getInvoices";
import { Invoice } from "@/types/invoice";
import CircularProgress from "@mui/material/CircularProgress";
import GenericTable from "@/components/table";
import { columnsTable } from "../constants/invoices";
import { generatePdfInvoice } from "@/services/generatePdfInvoice";
import { Text } from "@/components/text";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Captcha from "@/components/captcha";
import { useSnack } from "@/hooks/useSnack";

const FacturasMain = () => {
  const { enqueueSnack } = useSnack();
  const [documentId, setDocumentId] = useState("");
  const [dateStart, setDateStart] = useState<dayjs.Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [errors, setErrors] = useState({
    documentId: "",
    dateStart: "",
    dateEnd: "",
  });
  const [captchaText, setCaptchaText] = useState<string>("");

  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDocumentId(value); // Siempre permitimos que se escriba

    const soloNumeros = /^\d*$/.test(value);
    const longitudCorrecta = value.length <= 10;

    if (!soloNumeros) {
      setErrors((prev) => ({
        ...prev,
        documentId: "La cédula debe contener solo números.",
      }));
    } else if (!longitudCorrecta) {
      setErrors((prev) => ({
        ...prev,
        documentId: "La cédula no puede tener más de 10 dígitos.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, documentId: "" })); // No hay error
    }
  };

  const handleDateStartChange = (newValue: dayjs.Dayjs | null) => {
    setDateStart(newValue);
    setErrors((prev) => ({ ...prev, dateStart: "", dateEnd: "" })); // limpiar errores

    if (
      newValue &&
      dateEnd &&
      (dateEnd.isBefore(newValue, "day") ||
        dateEnd.isAfter(newValue.add(2, "month"), "day"))
    ) {
      setDateEnd(null);
      setErrors((prev) => ({
        ...prev,
        dateEnd:
          "La fecha de fin debe estar entre la fecha de inicio y dos meses después.",
      }));
    }
  };

  const handleDateEndChange = (newValue: dayjs.Dayjs | null) => {
    if (!dateStart) {
      setErrors((prev) => ({
        ...prev,
        dateStart: "Primero selecciona una fecha de inicio.",
      }));
      return;
    }

    const maxEndDate = dateStart.add(2, "month");

    if (newValue) {
      if (newValue.isBefore(dateStart, "day")) {
        setErrors((prev) => ({
          ...prev,
          dateEnd: "La fecha de fin debe ser posterior a la fecha de inicio.",
        }));
        return;
      }

      if (newValue.isAfter(maxEndDate, "day")) {
        setErrors((prev) => ({
          ...prev,
          dateEnd:
            "La fecha de fin no puede ser más de 2 meses después de la fecha de inicio.",
        }));
        return;
      }
    }

    setErrors((prev) => ({ ...prev, dateEnd: "" }));
    setDateEnd(newValue);
  };

  const handleSubmit = async () => {
    const newErrors = {
      documentId: "",
      dateStart: "",
      dateEnd: "",
    };

    let hasError = false;

    if (!documentId.trim()) {
      newErrors.documentId = "El número de cédula es obligatorio.";
      hasError = true;
    }

    if (!dateStart) {
      newErrors.dateStart = "La fecha de inicio es obligatoria.";
      hasError = true;
    }

    if (!dateEnd) {
      newErrors.dateEnd = "La fecha de fin es obligatoria.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors); // Limpiar errores si todo está bien
    setLoading(true);

    try {
      const invoicesData = await getInvoices({
        documentId,
        dateStart: dayjs(dateStart).format("YYYY-MM-DD"),
        dateEnd: dayjs(dateEnd).format("YYYY-MM-DD"),
        captchaText,
      });

      // Solo mostrar éxito si realmente fue exitoso
      if (invoicesData.status >= 200 && invoicesData.status < 300) {
        enqueueSnack("Datos obtenidos correctamente", "success");
        setInvoices(invoicesData.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching invoices:", error);

      // Manejo de errores mejorado
      if (error.status) {
        switch (error.status) {
          case 400:
            enqueueSnack("Captcha incorrecto", "error");
            break;
          case 403:
            enqueueSnack("El captcha no coincide", "error");
            break;
          case 404:
            enqueueSnack("No se encontraron facturas", "warning");
            break;
          case 429:
            enqueueSnack("Demasiadas solicitudes, intente más tarde", "error");
            break;
          case 500:
            enqueueSnack("Error interno del servidor", "error");
            break;
          case 503:
            enqueueSnack("Error de conexión con el servidor", "error");
            break;
          default:
            enqueueSnack(
              `Error: ${error.message || "Error desconocido"}`,
              "error"
            );
        }
      } else {
        enqueueSnack("Error desconocido al procesar la solicitud", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (row: any) => {
    try {
      const pdfBlob = await generatePdfInvoice(row);
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error al previsualizar la factura:", error);
    }
  };

  const handleDownload = async (invoice: any) => {
    try {
      const pdfBlob = await generatePdfInvoice(invoice);
      const blobUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `Factura-${dayjs(invoice.chs_data_dat).format(
        "DD-MM-YYYY"
      )}.pdf`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error al descargar la factura:", error);
    }
  };

  const handleCaptchaText = (value: string) => {
    setCaptchaText(value);
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Text variant="h1">Consulta de facturas</Text>
        <LogoutIcon
          onClick={() => {
            window.location.href = "https://metrodequito.gob.ec/";
          }}
          sx={{
            background: "#79ACD9",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            padding: "5px",
            "&:hover": {
              backgroundColor: "#4178B8",
            },
          }}
        />
      </Box>
      <Box sx={{ position: "relative", zIndex: "10", padding: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid sx={{ width: "30%" }}>
            <Input
              label="Número de cédula"
              placeholder="Ingrese el número de cédula"
              value={documentId}
              onChange={handleCedulaChange}
              errorText={errors.documentId}
            />
          </Grid>
          <Grid sx={{ width: "30%" }}>
            <DateTimePicker
              label="Desde"
              value={dateStart}
              onChange={handleDateStartChange}
              maxDate={dayjs()}
              errorText={errors.dateStart}
            />
          </Grid>
          <Grid sx={{ width: "30%" }}>
            <DateTimePicker
              label="Hasta"
              value={dateEnd}
              onChange={handleDateEndChange}
              errorText={errors.dateEnd}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" mt={3}>
          <Captcha onChange={handleCaptchaText} />
        </Grid>
        <Grid container justifyContent="end">
          <ButtonComponent
            label="Consultar"
            onClick={handleSubmit}
            color="primary"
            size="small"
            // disabled={!captchaValid}
          />
        </Grid>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ marginTop: 0, paddingBottom: 8 }}>
            {invoices.length > 0 ? (
              <>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <AccountCircleIcon color="primary" fontSize="large" />
                  <Typography variant="h3">
                    {invoices[0].account_razon}
                  </Typography>
                </Box>
                <GenericTable
                  columns={columnsTable}
                  rows={invoices}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              </>
            ) : (
              <>
                <br />
                <p>No hay facturas para mostrar.</p>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default FacturasMain;
