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

    if(!response.ok) {
      throw {
        status: response.status,
        data: null
      };;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

interface CaptchaResponse {
  captchaImage: string;
}
