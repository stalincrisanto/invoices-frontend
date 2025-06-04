import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Input from "./input";
import ButtonComponent from "./button";
import { Box } from "@mui/material";

// Import dinámico para evitar SSR
const LoadCanvasTemplate = dynamic(
  () => import("react-simple-captcha").then((mod) => mod.LoadCanvasTemplate),
  { ssr: false }
);

export default function CaptchaComponent({ onValid }: { onValid: () => void }) {
  const [userInput, setUserInput] = useState("");
  const [valid, setValid] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (captchaReady) {
      const { loadCaptchaEnginge } = require("react-simple-captcha");
      loadCaptchaEnginge(6);
    }
  }, [captchaReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (canvasContainerRef.current?.querySelector("canvas") !== null) {
        setCaptchaReady(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const validateCaptcha = () => {
    const { validateCaptcha } = require("react-simple-captcha");
    if (validateCaptcha(userInput)) {
      setValid(true);
      onValid();
      // alert("CAPTCHA válido");
    } else {
      setValid(false);
      alert("CAPTCHA incorrecto");
    }
  };

  return (
  <div ref={canvasContainerRef}>
    <Box
      width={"45%"}
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column", // columna principal
        alignItems: "flex-start",
        gap: 2, // espacio vertical entre filas
      }}
    >
      {/* Contenedor para input + imagen */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Digita el código de la imagen"
          sx={{ flexGrow: 1 }} // input ocupa espacio restante
        />
        <Box sx={{ marginLeft: "auto", ml: 2 }}>
          <LoadCanvasTemplate />
        </Box>
      </Box>

      {/* Botón debajo, alineado a la izquierda */}
      <ButtonComponent onClick={validateCaptcha} label="Validar" color="secondary"/>
    </Box>
  </div>
);
}
