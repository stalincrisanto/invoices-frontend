import { generateCaptcha } from "@/services/generateCaptcha";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Input from "./input";
import RefreshIcon from "@mui/icons-material/Refresh";

interface CaptchaProps {
  onChange: (value: string) => void;
}

const Captcha = ({ onChange }: CaptchaProps) => {
  const [captchaText, setCaptchaText] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState("");
  const captchaRef = useRef(null);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = async () => {
    const captcha = await generateCaptcha();
    setCaptchaText("");
    setCaptchaImage(captcha.captchaImage);
    onChange("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCaptchaText(value);
    onChange(value);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Input
          type="text"
          value={captchaText}
          onChange={handleChange}
          placeholder="Ej: X8T2P"
          sx={{ maxWidth: 300 }}
          label="Ingrese el código de la imagen"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            dangerouslySetInnerHTML={{ __html: captchaImage }}
            ref={captchaRef}
            sx={{
              border: "1px solid #ccc",
              padding: 1,
              display: "inline-block",
              minWidth: 100,
              textAlign: "center",
            }}
          />
          <Tooltip title="Refrescar captcha">
            <IconButton onClick={refreshCaptcha} aria-label="Refrescar captcha">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default Captcha;
