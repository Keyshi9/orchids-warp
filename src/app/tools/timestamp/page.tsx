"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Copy, Check, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

export default function TimestampPage() {
  const { t } = useLanguage();
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateString, setDateString] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(timestamp * 1000);
    setDateString(date.toISOString().slice(0, 16));
  }, [timestamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (value: string) => {
    setDateString(value);
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      setTimestamp(Math.floor(date.getTime() / 1000));
    }
  };

  const setNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const date = new Date(timestamp * 1000);
  const formats = [
    { label: "Unix (secondes)", value: String(timestamp) },
    { label: "Unix (millisecondes)", value: String(timestamp * 1000) },
    { label: "ISO 8601", value: date.toISOString() },
    { label: "Date locale", value: date.toLocaleDateString() },
    { label: "Heure locale", value: date.toLocaleTimeString() },
    { label: "Date et heure", value: date.toLocaleString() },
    { label: "UTC", value: date.toUTCString() },
  ];

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
            <Clock className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.tools.timestamp.name}</h1>
        </motion.div>

        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-1">Timestamp actuel</p>
            <p className="text-3xl font-mono font-semibold">{Math.floor(currentTime / 1000)}</p>
            <p className="text-sm text-muted-foreground mt-1">{new Date(currentTime).toLocaleString()}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Unix Timestamp</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={timestamp}
                    onChange={(e) => setTimestamp(parseInt(e.target.value) || 0)}
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={setNow}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date et heure</label>
                <Input
                  type="datetime-local"
                  value={dateString}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Formats</h3>
              <div className="space-y-3">
                {formats.map((format) => (
                  <div key={format.label} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-40 shrink-0">{format.label}</span>
                    <Input value={format.value} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(format.value, format.label)}
                    >
                      {copied === format.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
