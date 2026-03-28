import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-instrument" 
});

export const metadata: Metadata = {
  title: "Shriram Reddy | Portfolio",
  description: "Personal Portfolio of Shriram Reddy - Cybersecurity, Web Development & AI Expert",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} overflow-x-hidden`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
