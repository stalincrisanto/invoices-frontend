export const getInvoices = async ({
  documentId,
  dateStart,
  dateEnd,
}: Params) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/invoices?documentId=${documentId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching invoices");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getInvoices:", error);
    throw error;
  }
};

interface Params {
  documentId: string;
  dateStart: string;
  dateEnd: string;
}
