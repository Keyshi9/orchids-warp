"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Link2, Copy, Check, ArrowDownUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";
import { useLanguage } from "@/lib/language-context";

export default function UrlEncoderPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("Erreur: Texte invalide");
    }
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <AdminButton />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <Link2 className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.urlEncoder.name}</h1>
        </motion.div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant={mode === "encode" ? "default" : "outline"}
                onClick={() => setMode("encode")}
              >
                Encoder
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "outline"}
                onClick={() => setMode("decode")}
              >
                Décoder
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {mode === "encode" ? "Texte à encoder" : "URL à décoder"}
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Entrez le texte..." : "Entrez l'URL encodée..."}
                className="min-h-[100px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={process} className="flex-1">
                {mode === "encode" ? "Encoder" : "Décoder"}
              </Button>
              <Button variant="outline" size="icon" onClick={swap}>
                <ArrowDownUp className="w-4 h-4" />
              </Button>
            </div>

            {output && (
              <div>
                <label className="text-sm font-medium mb-2 block">Résultat</label>
                <div className="relative">
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[100px] font-mono text-sm pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
