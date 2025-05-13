import { Invoice } from "@/types/invoice";

export const generatePdfInvoice = async (invoice: Invoice) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ invoice: invoice })
  });

  if (!response.ok) {
    throw new Error("Error al generar PDF");
  }

  return await response.blob();
};
