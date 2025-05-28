import Image from "next/image";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <>
      <Box component="header" sx={{ width: "100%" }}>
        <Image
          src="/images/header.png"
          alt="Header"
          width={1920}
          height={100}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </>
  );
}
