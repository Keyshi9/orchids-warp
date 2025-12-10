"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

function getBMICategory(bmi: number, t: { bmi?: { underweight?: string; normal?: string; overweight?: string; obese?: string } }): { label: string; color: string } {
  if (bmi < 18.5) return { label: t.bmi?.underweight || "Insuffisance pondérale", color: "text-blue-500" };
  if (bmi < 25) return { label: t.bmi?.normal || "Poids normal", color: "text-green-500" };
  if (bmi < 30) return { label: t.bmi?.overweight || "Surpoids", color: "text-yellow-500" };
  return { label: t.bmi?.obese || "Obésité", color: "text-red-500" };
}

export default function BMIPage() {
  const { t } = useLanguage();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(Math.round(result * 10) / 10);
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
  };

  const category = bmi ? getBMICategory(bmi, t) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
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

      <main className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <Scale className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.bmi?.title || "Calculateur IMC"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t.bmi?.subtitle || "Calculez votre indice de masse corporelle"}
          </p>
        </motion.div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t.bmi?.weight || "Poids"} (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-3 text-lg bg-secondary/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {t.bmi?.height || "Taille"} (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-3 text-lg bg-secondary/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateBMI} className="flex-1">
                {t.bmi?.calculate || "Calculer"}
              </Button>
              <Button variant="outline" onClick={reset}>
                {t.bmi?.reset || "Reset"}
              </Button>
            </div>

            {bmi !== null && category && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-secondary/30 rounded-lg text-center"
              >
                <p className="text-sm text-muted-foreground mb-1">{t.bmi?.result || "Votre IMC"}</p>
                <p className="text-4xl font-bold mb-2">{bmi}</p>
                <p className={`text-sm font-medium ${category.color}`}>{category.label}</p>
              </motion.div>
            )}

            <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium mb-2">{t.bmi?.scale || "Échelle IMC"}</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-500">&lt; 18.5</span>
                  <span className="text-muted-foreground">{t.bmi?.underweight || "Insuffisance pondérale"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-500">18.5 - 24.9</span>
                  <span className="text-muted-foreground">{t.bmi?.normal || "Poids normal"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">25 - 29.9</span>
                  <span className="text-muted-foreground">{t.bmi?.overweight || "Surpoids"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">&ge; 30</span>
                  <span className="text-muted-foreground">{t.bmi?.obese || "Obésité"}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
