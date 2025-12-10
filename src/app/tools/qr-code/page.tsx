"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, QrCode, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

export default function QrCodePage() {
  const { t } = useLanguage();
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text || !canvasRef.current) return;

    const QRCode = (await import("qrcode")).default;
    await QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    });
  };

  useEffect(() => {
    generateQR();
  }, [text, size, fgColor, bgColor]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{t.header.back}</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <span className="text-lg font-semibold">Warp</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <QrCode className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.qrGenerator.name}</h1>
        </motion.div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Contenu</label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="URL ou texte..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Taille ({size}px)</label>
                <input
                  type="range"
                  min={100}
                  max={400}
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Couleur QR</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="font-mono" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Fond</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono" />
                  </div>
                </div>
              </div>

              <Button onClick={downloadQR} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Télécharger PNG
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <div className="border rounded-lg p-4 bg-white">
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
