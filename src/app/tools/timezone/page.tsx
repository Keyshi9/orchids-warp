"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

const timezones = [
  { id: "local", name: "Local", zone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: "utc", name: "UTC", zone: "UTC" },
  { id: "paris", name: "Paris", zone: "Europe/Paris" },
  { id: "london", name: "Londres", zone: "Europe/London" },
  { id: "new_york", name: "New York", zone: "America/New_York" },
  { id: "los_angeles", name: "Los Angeles", zone: "America/Los_Angeles" },
  { id: "tokyo", name: "Tokyo", zone: "Asia/Tokyo" },
  { id: "sydney", name: "Sydney", zone: "Australia/Sydney" },
  { id: "dubai", name: "Dubai", zone: "Asia/Dubai" },
  { id: "singapore", name: "Singapour", zone: "Asia/Singapore" },
  { id: "hong_kong", name: "Hong Kong", zone: "Asia/Hong_Kong" },
  { id: "mumbai", name: "Mumbai", zone: "Asia/Kolkata" },
  { id: "moscow", name: "Moscou", zone: "Europe/Moscow" },
  { id: "berlin", name: "Berlin", zone: "Europe/Berlin" },
  { id: "zurich", name: "Zurich", zone: "Europe/Zurich" },
  { id: "toronto", name: "Toronto", zone: "America/Toronto" },
  { id: "sao_paulo", name: "São Paulo", zone: "America/Sao_Paulo" },
];

function getTimeInZone(zone: string): string {
  return new Date().toLocaleTimeString("fr-FR", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getDateInZone(zone: string): string {
  return new Date().toLocaleDateString("fr-FR", {
    timeZone: zone,
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function getOffset(zone: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find((p) => p.type === "timeZoneName");
  return offsetPart?.value || "";
}

export default function TimezonePage() {
  const { t } = useLanguage();
  const [selectedZones, setSelectedZones] = useState<string[]>(["local", "utc", "new_york", "tokyo"]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addZone = (id: string) => {
    if (!selectedZones.includes(id)) {
      setSelectedZones([...selectedZones, id]);
    }
    setShowSelector(false);
  };

  const removeZone = (id: string) => {
    setSelectedZones(selectedZones.filter((z) => z !== id));
  };

  const availableZones = timezones.filter((tz) => !selectedZones.includes(tz.id));

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

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <Clock className="w-7 h-7 text-background" />
          </div>
          <h1 className="text-2xl font-semibold">{t.timezone?.title || "Fuseaux Horaires"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t.timezone?.subtitle || "Comparez l'heure dans différentes villes"}
          </p>
        </motion.div>

        <div className="space-y-3">
          {selectedZones.map((zoneId, index) => {
            const tz = timezones.find((t) => t.id === zoneId);
            if (!tz) return null;
            return (
              <motion.div
                key={tz.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tz.name}</span>
                        <span className="text-xs text-muted-foreground">{getOffset(tz.zone)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{getDateInZone(tz.zone)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-mono tabular-nums">{getTimeInZone(tz.zone)}</span>
                      {selectedZones.length > 1 && (
                        <button
                          onClick={() => removeZone(tz.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {availableZones.length > 0 && (
          <div className="mt-4">
            {showSelector ? (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{t.timezone?.addCity || "Ajouter une ville"}</span>
                  <button
                    onClick={() => setShowSelector(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availableZones.map((tz) => (
                    <Button
                      key={tz.id}
                      variant="outline"
                      size="sm"
                      onClick={() => addZone(tz.id)}
                      className="justify-start"
                    >
                      {tz.name}
                    </Button>
                  ))}
                </div>
              </Card>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowSelector(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.timezone?.addCity || "Ajouter une ville"}
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
