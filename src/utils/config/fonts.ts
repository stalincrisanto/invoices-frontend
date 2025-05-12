import localFont from "next/font/local";

const ottercoFont = localFont({
  variable: "--font-otterco",
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/Otterco-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Otterco-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Otterco-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../../public/fonts/Otterco-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
});

export default ottercoFont;
