"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RefreshCw,
  Palette,
  Type,
  Hash,
  QrCode,
  Clock,
  Calculator,
  Link2,
  FileJson,
  ArrowRight,
  Coins,
  Divide,
  Send,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";

type ToolKey = "converter" | "currency" | "calculator" | "ruleOfThree" | "colorPicker" | "textTools" | "hashGenerator" | "qrGenerator" | "timestamp" | "urlEncoder" | "jsonFormatter";

type Tool = {
  id: string;
  key: ToolKey;
  icon: React.ReactNode;
  href: string;
};

const tools: Tool[] = [
  { id: "converter", key: "converter", icon: <RefreshCw className="w-5 h-5" />, href: "/tools/converter" },
  { id: "currency", key: "currency", icon: <Coins className="w-5 h-5" />, href: "/tools/currency" },
  { id: "calculator", key: "calculator", icon: <Calculator className="w-5 h-5" />, href: "/tools/calculator" },
  { id: "rule-of-three", key: "ruleOfThree", icon: <Divide className="w-5 h-5" />, href: "/tools/rule-of-three" },
  { id: "color-picker", key: "colorPicker", icon: <Palette className="w-5 h-5" />, href: "/tools/color-picker" },
  { id: "text-tools", key: "textTools", icon: <Type className="w-5 h-5" />, href: "/tools/text" },
  { id: "hash-generator", key: "hashGenerator", icon: <Hash className="w-5 h-5" />, href: "/tools/hash" },
  { id: "qr-generator", key: "qrGenerator", icon: <QrCode className="w-5 h-5" />, href: "/tools/qr-code" },
  { id: "timestamp", key: "timestamp", icon: <Clock className="w-5 h-5" />, href: "/tools/timestamp" },
  { id: "url-encoder", key: "urlEncoder", icon: <Link2 className="w-5 h-5" />, href: "/tools/url-encoder" },
  { id: "json-formatter", key: "jsonFormatter", icon: <FileJson className="w-5 h-5" />, href: "/tools/json" },
];

function AdBanner({ position }: { position: string }) {
  const { t, adsEnabled } = useLanguage();
  
  if (!adsEnabled) return null;
  
  return (
    <div className="ad-placeholder rounded p-4 flex items-center justify-center min-h-[90px]">
      <div className="text-center">
        <p className="text-muted-foreground text-sm">{t.home.ad} - {position}</p>
      </div>
    </div>
  );
}

function SuggestionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [suggestion, setSuggestion] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suggestions = JSON.parse(localStorage.getItem("warp-suggestions") || "[]");
    suggestions.push({
      suggestion,
      email: email || "Anonyme",
      date: new Date().toISOString(),
    });
    localStorage.setItem("warp-suggestions", JSON.stringify(suggestions));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestion("");
      setEmail("");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{t.home.suggestion}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">Merci pour votre suggestion !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Votre suggestion</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Décrivez l'outil que vous aimeriez voir..."
                  className="w-full h-24 px-3 py-2 text-sm bg-secondary/50 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email (optionnel)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2 text-sm bg-secondary/50 border rounded focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { t, adsEnabled } = useLanguage();
  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-semibold">Warp</span>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.header.tools}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <AdBanner position="Header Banner" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
              {t.home.title}
            </h1>
            <p className="text-muted-foreground max-w-xl">
              {t.home.subtitle}
            </p>
          </motion.div>
        </section>

        <div className="flex gap-6">
          {adsEnabled && (
            <div className="hidden xl:block w-[160px] shrink-0">
              <div className="sticky top-20">
                <div className="ad-placeholder rounded p-2 flex items-center justify-center min-h-[600px]">
                  <p className="text-muted-foreground text-xs">{t.home.pub}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <section id="tools" className="mb-12">
              <h2 className="text-lg font-medium mb-4">
                {t.home.availableTools}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={tool.href}>
                      <Card className="group p-4 h-full hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded bg-foreground flex items-center justify-center text-background shrink-0">
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 group-hover:underline">
                              {t.tools[tool.key].name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {t.tools[tool.key].description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="mb-8">
              <AdBanner position="Mid Content" />
            </div>

            <section className="mb-8">
              <Card className="p-6 bg-secondary/30">
                <h2 className="text-lg font-medium mb-2">
                  {t.home.suggestion}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.home.suggestionDesc}
                </p>
                <Button size="sm" onClick={() => setShowSuggestion(true)}>
                  {t.home.suggestTool}
                </Button>
              </Card>
            </section>
          </div>

          {adsEnabled && (
            <div className="hidden xl:block w-[160px] shrink-0">
              <div className="sticky top-20">
                <div className="ad-placeholder rounded p-2 flex items-center justify-center min-h-[600px]">
                  <p className="text-muted-foreground text-xs">{t.home.pub}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <AdBanner position="Footer Banner" />
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="font-medium">Warp</span>
              <p className="text-muted-foreground text-xs mt-2">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t.footer.tools}</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="/tools/converter" className="hover:text-foreground">{t.tools.converter.name}</Link></li>
                <li><Link href="/tools/currency" className="hover:text-foreground">{t.tools.currency.name}</Link></li>
                <li><Link href="/tools/calculator" className="hover:text-foreground">{t.tools.calculator.name}</Link></li>
                <li><Link href="/tools/rule-of-three" className="hover:text-foreground">{t.tools.ruleOfThree.name}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t.footer.resources}</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground">{t.footer.documentation}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t.footer.legal}</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">{t.footer.privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">{t.footer.terms}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center text-xs text-muted-foreground">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      <SuggestionModal isOpen={showSuggestion} onClose={() => setShowSuggestion(false)} />
    </div>
  );
}