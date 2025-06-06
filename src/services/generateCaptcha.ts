export const generateCaptcha = async (): Promise<CaptchaResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/captcha/generate`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al generar el captcha", error);
    throw error;
  }
};

interface CaptchaResponse {
  captchaImage: string;
}
