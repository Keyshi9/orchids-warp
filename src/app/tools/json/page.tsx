"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileJson, Copy, Check, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";
import { useLanguage } from "@/lib/language-context";

export default function JsonFormatterPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError(null);
      setOutput("JSON valide ✓");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <FileJson className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.jsonFormatter.name}</h1>
        </motion.div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Entrée JSON</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Résultat</label>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                />
                {output && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {output === "JSON valide ✓" && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-500">JSON valide</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <Button onClick={formatJson}>Formater</Button>
            <Button variant="outline" onClick={minifyJson}>Minifier</Button>
            <Button variant="outline" onClick={validateJson}>Valider</Button>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-muted-foreground">Indentation:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                <option value={2}>2 espaces</option>
                <option value={4}>4 espaces</option>
                <option value={1}>1 tab</option>
              </select>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
