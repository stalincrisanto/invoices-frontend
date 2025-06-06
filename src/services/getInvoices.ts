export const getInvoices = async ({
  documentId,
  dateStart,
  dateEnd,
  captchaText,
}: Params): Promise<{ data: any; status: number }> => {
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        data: errorData,
        message: errorData.message || "Error en la solicitud",
      };
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    // Si es un error de red u otro tipo de error
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw {
        status: 503,
        data: null,
        message: "Error de conexión con el servidor",
      };
    }
    // Re-lanzar errores que ya hayamos procesado
    if (typeof error === "object" && error !== null && "status" in error) {
      throw error;
    }
    // Error genérico no capturado
    throw {
      status: 500,
      data: null,
      message: "Error interno del servidor",
    };
  }
};

interface Params {
  documentId: string;
  dateStart: string;
  dateEnd: string;
  captchaText: string;
}
