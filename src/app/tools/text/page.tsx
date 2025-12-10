"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Type, Copy, Check, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";
import { useLanguage } from "@/lib/language-context";

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export default function TextToolsPage() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split(/\n/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0,
  };

  const transform = (type: string) => {
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "capitalize":
        setText(text.replace(/\b\w/g, (c) => c.toUpperCase()));
        break;
      case "sentence":
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
        break;
      case "reverse":
        setText(text.split("").reverse().join(""));
        break;
      case "trim":
        setText(text.trim().replace(/\s+/g, " "));
        break;
      case "lorem":
        setText(loremIpsum);
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
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
            <Type className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.textTools.name}</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Entrez votre texte ici..."
                className="min-h-[300px] font-mono text-sm resize-none"
              />
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => transform("upper")}>MAJUSCULES</Button>
                <Button variant="outline" size="sm" onClick={() => transform("lower")}>minuscules</Button>
                <Button variant="outline" size="sm" onClick={() => transform("capitalize")}>Capitalize</Button>
                <Button variant="outline" size="sm" onClick={() => transform("sentence")}>Phrase</Button>
                <Button variant="outline" size="sm" onClick={() => transform("reverse")}>Inverser</Button>
                <Button variant="outline" size="sm" onClick={() => transform("trim")}>Nettoyer</Button>
                <Button variant="outline" size="sm" onClick={() => transform("lorem")}>Lorem Ipsum</Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={copyToClipboard} disabled={!text}>
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copier
                </Button>
                <Button variant="outline" onClick={() => setText("")}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Effacer
                </Button>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-4">
              <h3 className="font-medium mb-4">Statistiques</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Caractères</span>
                  <span className="font-mono">{stats.characters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sans espaces</span>
                  <span className="font-mono">{stats.charactersNoSpaces}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mots</span>
                  <span className="font-mono">{stats.words}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lignes</span>
                  <span className="font-mono">{stats.lines}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phrases</span>
                  <span className="font-mono">{stats.sentences}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paragraphes</span>
                  <span className="font-mono">{stats.paragraphs}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
