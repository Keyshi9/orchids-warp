"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";
import { useLanguage } from "@/lib/language-context";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorPickerPage() {
  const { t } = useLanguage();
  const [color, setColor] = useState("#6366f1");
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const rgbVal = hexToRgb(color);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  }, [color]);

  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [component]: Math.min(255, Math.max(0, value)) };
    setRgb(newRgb);
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const hexValue = color.toUpperCase();
  const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

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
            <AdminButton />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <Palette className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.colorPicker.name}</h1>
        </motion.div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div
                className="w-full aspect-square rounded-lg border mb-4"
                style={{ backgroundColor: color }}
              />
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">HEX</label>
                <div className="flex gap-2">
                  <Input
                    value={hexValue}
                    onChange={(e) => setColor(e.target.value)}
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(hexValue, "hex")}>
                    {copied === "hex" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">RGB</label>
                <div className="flex gap-2">
                  <Input value={rgbValue} readOnly className="font-mono" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(rgbValue, "rgb")}>
                    {copied === "rgb" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <label className="text-xs text-muted-foreground">R</label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.r}
                      onChange={(e) => handleRgbChange("r", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">G</label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.g}
                      onChange={(e) => handleRgbChange("g", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">B</label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.b}
                      onChange={(e) => handleRgbChange("b", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">HSL</label>
                <div className="flex gap-2">
                  <Input value={hslValue} readOnly className="font-mono" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(hslValue, "hsl")}>
                    {copied === "hsl" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
