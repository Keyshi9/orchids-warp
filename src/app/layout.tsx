import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warp - Tous vos outils en un seul endroit",
  description: "Convertisseur de fichiers, color picker, générateur QR code et plus. Une collection d'outils gratuits et puissants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}