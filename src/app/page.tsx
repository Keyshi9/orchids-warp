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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdminButton } from "@/components/admin-button";
import { useLanguage } from "@/lib/language-context";

type ToolKey = "converter" | "currency" | "calculator" | "ruleOfThree" | "colorPicker" | "textTools" | "hashGenerator" | "qrGenerator" | "timestamp" | "urlEncoder" | "jsonFormatter";

type Tool = {
  id: string;
  key: ToolKey;
  icon: React.ReactNode;
  href: string;
  available: boolean;
};

const tools: Tool[] = [
  { id: "converter", key: "converter", icon: <RefreshCw className="w-5 h-5" />, href: "/tools/converter", available: true },
  { id: "currency", key: "currency", icon: <Coins className="w-5 h-5" />, href: "/tools/currency", available: true },
  { id: "calculator", key: "calculator", icon: <Calculator className="w-5 h-5" />, href: "/tools/calculator", available: true },
  { id: "rule-of-three", key: "ruleOfThree", icon: <Divide className="w-5 h-5" />, href: "/tools/rule-of-three", available: true },
  { id: "color-picker", key: "colorPicker", icon: <Palette className="w-5 h-5" />, href: "/tools/color-picker", available: false },
  { id: "text-tools", key: "textTools", icon: <Type className="w-5 h-5" />, href: "/tools/text", available: false },
  { id: "hash-generator", key: "hashGenerator", icon: <Hash className="w-5 h-5" />, href: "/tools/hash", available: false },
  { id: "qr-generator", key: "qrGenerator", icon: <QrCode className="w-5 h-5" />, href: "/tools/qr-code", available: false },
  { id: "timestamp", key: "timestamp", icon: <Clock className="w-5 h-5" />, href: "/tools/timestamp", available: false },
  { id: "url-encoder", key: "urlEncoder", icon: <Link2 className="w-5 h-5" />, href: "/tools/url-encoder", available: false },
  { id: "json-formatter", key: "jsonFormatter", icon: <FileJson className="w-5 h-5" />, href: "/tools/json", available: false },
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

export default function Home() {
  const { t, adsEnabled } = useLanguage();
  const availableTools = tools.filter((tool) => tool.available);
  const comingSoonTools = tools.filter((tool) => !tool.available);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-semibold">Warp</span>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.header.tools}
            </a>
            <a href="#coming-soon" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.header.comingSoon}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <AdminButton />
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
              <div className="grid md:grid-cols-2 gap-3">
                {availableTools.map((tool, index) => (
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

            <section id="coming-soon" className="mb-12">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t.home.comingSoonSection}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {comingSoonTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card className="p-4 h-full opacity-60">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1">
                            {t.tools[tool.key].name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {t.tools[tool.key].description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <Card className="p-6 bg-secondary/30">
                <h2 className="text-lg font-medium mb-2">
                  {t.home.suggestion}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.home.suggestionDesc}
                </p>
                <Button size="sm">
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
                <li><a href="#" className="hover:text-foreground">{t.footer.api}</a></li>
                <li><a href="#" className="hover:text-foreground">{t.footer.documentation}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t.footer.legal}</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">{t.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-foreground">{t.footer.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center text-xs text-muted-foreground">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
