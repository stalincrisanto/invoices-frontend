import Image from "next/image";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Image
        src="/images/header.png"
        alt="Header"
        width={1920}
        height={100}
        style={{ width: "100%", height: "auto" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: 4,
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Logo superpuesto"
          width={150}
          height={150}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
