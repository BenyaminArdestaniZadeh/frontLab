import type { Metadata } from "next";
import { iranSans } from "@/styles/fonts";
import { StyledComponentsRegistry, ThemeProvider } from "@/providers";
import "@/styles/globals.css";

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
