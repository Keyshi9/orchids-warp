"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calculator, Delete } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num: string) => {
    if (hasResult) {
      setDisplay(num);
      setEquation("");
      setHasResult(false);
    } else if (display === "0" && num !== ".") {
      setDisplay(num);
    } else if (num === "." && display.includes(".")) {
      return;
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
    setHasResult(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setHasResult(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      const sanitized = fullEquation
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/[^0-9+\-*/.() ]/g, "");
      const result = Function('"use strict"; return (' + sanitized + ")")();
      setDisplay(String(parseFloat(result.toFixed(10))));
      setEquation(fullEquation + " =");
      setHasResult(true);
    } catch {
      setDisplay("Erreur");
      setHasResult(true);
    }
  };

  const handlePercent = () => {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
  };

  const handleSign = () => {
    const num = parseFloat(display);
    setDisplay(String(num * -1));
  };

  const buttons = [
    { label: "C", action: handleClear, className: "bg-secondary text-secondary-foreground" },
    { label: "±", action: handleSign, className: "bg-secondary text-secondary-foreground" },
    { label: "%", action: handlePercent, className: "bg-secondary text-secondary-foreground" },
    { label: "÷", action: () => handleOperator("÷"), className: "bg-foreground text-background" },
    { label: "7", action: () => handleNumber("7"), className: "" },
    { label: "8", action: () => handleNumber("8"), className: "" },
    { label: "9", action: () => handleNumber("9"), className: "" },
    { label: "×", action: () => handleOperator("×"), className: "bg-foreground text-background" },
    { label: "4", action: () => handleNumber("4"), className: "" },
    { label: "5", action: () => handleNumber("5"), className: "" },
    { label: "6", action: () => handleNumber("6"), className: "" },
    { label: "-", action: () => handleOperator("-"), className: "bg-foreground text-background" },
    { label: "1", action: () => handleNumber("1"), className: "" },
    { label: "2", action: () => handleNumber("2"), className: "" },
    { label: "3", action: () => handleNumber("3"), className: "" },
    { label: "+", action: () => handleOperator("+"), className: "bg-foreground text-background" },
    { label: "0", action: () => handleNumber("0"), className: "col-span-2" },
    { label: ".", action: () => handleNumber("."), className: "" },
    { label: "=", action: handleEquals, className: "bg-foreground text-background" },
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
            <Calculator className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">Calculatrice</h1>
        </motion.div>

        <Card className="p-4">
          <div className="bg-secondary/30 rounded-lg p-4 mb-4">
            <div className="text-right text-sm text-muted-foreground h-6 overflow-hidden">
              {equation}
            </div>
            <div className="text-right text-4xl font-light tracking-tight overflow-hidden">
              {display}
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Delete className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-14 text-lg font-medium ${btn.className}`}
                onClick={btn.action}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
