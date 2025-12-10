import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToolBox - Tous vos outils en un seul endroit",
  description: "Convertisseur de fichiers, color picker, générateur QR code et plus. Une collection d'outils gratuits et puissants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}