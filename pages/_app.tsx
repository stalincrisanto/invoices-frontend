import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Head from "next/head";
import { Layout } from "@/components/layout";
import { theme } from "@/utils/config/theme";
import ottercoFont from "@/utils/config/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{"Consulta de facturas"}</title>
        <meta name="description" content={"Consulta de facturas"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="mainDiv" className={`${ottercoFont.variable} `}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}
