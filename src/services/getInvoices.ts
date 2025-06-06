export const getInvoices = async ({
  documentId,
  dateStart,
  dateEnd,
  captchaText,
}: Params) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/invoices?documentId=${documentId}&dateStart=${dateStart}&dateEnd=${dateEnd}&captchaText=${captchaText}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { data: [], status: 500 };
  }
};

interface Params {
  documentId: string;
  dateStart: string;
  dateEnd: string;
  captchaText: string;
}
