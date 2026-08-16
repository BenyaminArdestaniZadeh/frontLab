import type { Metadata } from "next";
import { iranSans } from "@/src/styles/fonts";
import { StyledComponentsRegistry, ThemeProvider } from "@/src/providers";
import "@/src/styles/globals.css";

export const metadata: Metadata = {
  title: "FrontLab",
  description: "Frontend Engineering Bootcamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
