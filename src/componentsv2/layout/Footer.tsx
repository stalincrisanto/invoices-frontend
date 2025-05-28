import { Box } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      bgcolor={"rgb(198, 194, 194)"}
    >
      <Image
        src="/images/footer.gif"
        alt="Footer"
        width={1920}
        height={100}
        style={{ width: "75%", height: "auto" }}
      />
    </Box>
  );
}
