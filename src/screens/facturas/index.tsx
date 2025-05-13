import DateTimePicker from "@/components/dateTimePicker";
import Input from "@/components/input";
import Title from "@/components/title";
import ButtonComponent from "@/components/button"; // Importamos el botón genérico
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { getInvoices } from "@/services/getInvoices";
import { Invoice } from "@/types/invoice";
import CircularProgress from "@mui/material/CircularProgress";
import GenericTable from "@/components/table";
import { columnsTable } from "../constants/invoices";
import { generatePdfInvoice } from "@/services/generatePdfInvoice";

const FacturasMain = () => {
  const [documentId, setDocumentId] = useState("");
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentId(event.target.value);
  };

  const handleDateStartChange = (newValue: any) => {
    setDateStart(newValue);
  };

  const handleDateEndChange = (newValue: any) => {
    setDateEnd(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const invoicesData = await getInvoices({
        documentId,
        dateStart: dayjs(dateStart).format("YYYY-MM-DD"),
        dateEnd: dayjs(dateEnd).format("YYYY-MM-DD"),
      });
      setInvoices(invoicesData.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
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

  return (
    <>
      <Title title="Consulta de Facturas" />
      <Box sx={{ position: "relative", zIndex: "10", padding: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid sx={{ width: "30%" }}>
            <Input
              label="Número de cédula"
              placeholder="Ingrese el número de cédula"
              value={documentId}
              onChange={handleCedulaChange}
            />
          </Grid>
          <Grid sx={{ width: "30%" }}>
            <DateTimePicker
              label="Desde"
              value={dateStart}
              onChange={handleDateStartChange}
            />
          </Grid>
          <Grid sx={{ width: "30%" }}>
            <DateTimePicker
              label="Hasta"
              value={dateEnd}
              onChange={handleDateEndChange}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="end" sx={{ marginTop: 2 }}>
          <ButtonComponent
            label="Consultar"
            onClick={handleSubmit}
            color="primary"
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
                <Typography variant="h6">
                  Nombre: {invoices[0].account_razon}
                </Typography>
                <GenericTable
                  columns={columnsTable}
                  rows={invoices}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              </>
            ) : (
              <p>No hay facturas para mostrar.</p>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default FacturasMain;
