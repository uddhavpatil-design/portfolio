import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const fontHeading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const fontSubheading = Outfit({ subsets: ["latin"], variable: "--font-subheading" });

export const metadata: Metadata = {
  title: "Portfolio | Uddhav Patil",
  description: "Creative Developer & Full Stack Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} ${fontSubheading.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
