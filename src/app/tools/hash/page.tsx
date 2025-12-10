"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Hash, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const algorithms = [
    { name: "SHA-1", algo: "SHA-1" },
    { name: "SHA-256", algo: "SHA-256" },
    { name: "SHA-384", algo: "SHA-384" },
    { name: "SHA-512", algo: "SHA-512" },
  ];

  const generateHashes = async () => {
    if (!text) return;
    setLoading(true);
    const results: Record<string, string> = {};
    for (const { name, algo } of algorithms) {
      results[name] = await hashText(text, algo);
    }
    setHashes(results);
    setLoading(false);
  };

  const copyToClipboard = (hash: string, name: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
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
            <Hash className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.hashGenerator.name}</h1>
        </motion.div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Texte à hasher</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Entrez votre texte..."
                className="min-h-[100px] font-mono text-sm"
              />
            </div>

            <Button onClick={generateHashes} disabled={!text || loading} className="w-full">
              {loading ? "Génération..." : "Générer les hashs"}
            </Button>

            {Object.keys(hashes).length > 0 && (
              <div className="space-y-3 pt-4 border-t">
                {algorithms.map(({ name }) => (
                  <div key={name}>
                    <label className="text-sm font-medium mb-1 block">{name}</label>
                    <div className="flex gap-2">
                      <Input value={hashes[name] || ""} readOnly className="font-mono text-xs" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(hashes[name], name)}
                      >
                        {copied === name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
