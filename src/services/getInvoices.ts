export const getInvoices = async ({
  documentId,
  dateStart,
  dateEnd,
}: Params) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invoices?documentId=${documentId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching invoices");
  }

  const data = await response.json();
  return data;
};

interface Params {
  documentId: string;
  dateStart: string;
  dateEnd: string;
}
