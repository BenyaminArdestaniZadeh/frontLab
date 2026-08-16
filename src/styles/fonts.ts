import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSansX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansXFaNum-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--sans-font",
  display: "swap",
  preload: true,
});
