"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/language-context";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { getAnalytics } from "@/lib/analytics";

type Stats = ReturnType<typeof getAnalytics>;

export function AdminContent() {
  const { t, adsEnabled, setAdsEnabled } = useLanguage();
  const [activeTab, setActiveTab] = useState<"users" | "stats" | "settings">("users");
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = () => {
    setIsLoading(true);
    const data = getAnalytics();
    setStats(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

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
            <Button variant="ghost" size="sm" onClick={loadStats} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-foreground flex items-center justify-center">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-2xl font-semibold">{t.admin.title}</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            {t.admin.subtitle}
          </p>
        </motion.div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("users")}
          >
            USR
          </Button>
          <Button
            variant={activeTab === "stats" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("stats")}
          >
            STAT
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("settings")}
          >
            CFG
          </Button>
        </div>

        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="p-6">
              <h3 className="font-medium mb-4">{t.admin.users} - {t.admin.usersDesc}</h3>
              {stats && stats.recentUsers.length > 0 ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground pb-2 border-b">
                    <span>#</span>
                    <span>Pays</span>
                    <span>Ville</span>
                    <span>Page</span>
                    <span>Date</span>
                  </div>
                  {stats.recentUsers.map((user) => (
                    <div key={`${user.id}-${user.date}`} className="grid grid-cols-5 text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground">{user.id}</span>
                      <span className="font-mono">{user.country}</span>
                      <span className="truncate">{user.city}</span>
                      <span className="font-mono text-xs truncate">{user.page}</span>
                      <span className="text-muted-foreground text-xs">{user.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Aucune visite enregistrée. Naviguez sur le site pour générer des données.</p>
              )}
            </Card>
          </motion.div>
        )}

        {activeTab === "stats" && stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Aujourd&apos;hui</p>
                <p className="text-2xl font-semibold">{stats.today.visits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stats.today.uniqueVisitors} uniques</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Cette semaine</p>
                <p className="text-2xl font-semibold">{stats.week.visits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stats.week.uniqueVisitors} uniques</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Ce mois</p>
                <p className="text-2xl font-semibold">{stats.month.visits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stats.month.uniqueVisitors} uniques</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Pages les plus visitées</h3>
              <div className="space-y-3">
                {stats.topPages.map((page, i) => (
                  <div key={page.page} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="flex-1 text-sm font-mono">{page.page}</span>
                    <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Trafic par pays</h3>
              <div className="space-y-3">
                {stats.topCountries.map((country) => (
                  <div key={country.country} className="flex items-center gap-3">
                    <span className="font-mono text-sm w-8">{country.country}</span>
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-foreground h-2 rounded-full"
                        style={{ width: `${country.percent}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">{country.percent}%</span>
                    <span className="text-sm font-medium w-16 text-right">{country.visits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="p-6">
              <h3 className="font-medium mb-4">{t.admin.settings}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="text-sm font-medium">{t.admin.toggleAds}</p>
                    <p className="text-xs text-muted-foreground">
                      {adsEnabled ? t.admin.adsEnabled : t.admin.adsDisabled}
                    </p>
                  </div>
                  <Switch
                    checked={adsEnabled}
                    onCheckedChange={setAdsEnabled}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
