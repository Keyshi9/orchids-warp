"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Divide, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";

export default function RuleOfThreePage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC) && numA !== 0) {
      const x = (numB * numC) / numA;
      setResult(x.toFixed(4).replace(/\.?0+$/, ""));
    } else {
      setResult(null);
    }
  }, [a, b, c]);

  const examples = [
    { a: "100", b: "25", c: "200", desc: "Pourcentage: 25% de 200" },
    { a: "3", b: "150", c: "5", desc: "Proportions: 3→150, donc 5→?" },
    { a: "60", b: "100", c: "45", desc: "Minutes: 60min=100%, 45min=?" },
  ];

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
              <span className="text-sm">Retour</span>
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

      <main className="max-w-lg mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <Divide className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">Règle de Trois</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Si A correspond à B, alors C correspond à ?
          </p>
        </motion.div>

        <Card className="p-6 mb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div>
                <label className="text-sm font-medium mb-2 block">A</label>
                <Input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="100"
                  className="text-lg text-center"
                />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground mt-6" />
              <div>
                <label className="text-sm font-medium mb-2 block">B</label>
                <Input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="25"
                  className="text-lg text-center"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div>
                  <label className="text-sm font-medium mb-2 block">C</label>
                  <Input
                    type="number"
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    placeholder="200"
                    className="text-lg text-center"
                  />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground mt-6" />
                <div>
                  <label className="text-sm font-medium mb-2 block">Résultat</label>
                  <div className="h-11 rounded-md border bg-secondary/30 flex items-center justify-center text-lg font-medium">
                    {result !== null ? result : "?"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Formule</p>
              <p className="font-mono">
                X = (B × C) / A = ({b || "B"} × {c || "C"}) / {a || "A"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-medium mb-4">Exemples rapides</h2>
          <div className="space-y-3">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setA(ex.a);
                  setB(ex.b);
                  setC(ex.c);
                }}
                className="w-full p-3 rounded border hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="font-medium text-sm">{ex.desc}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {ex.a} → {ex.b}, {ex.c} → ?
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
