"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRightLeft,
  Coins,
  RefreshCw,
  Wrench,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

const currencies: Currency[] = [
  { code: "USD", name: "Dollar américain", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "CHF", name: "Franc suisse", symbol: "CHF" },
  { code: "GBP", name: "Livre sterling", symbol: "£" },
  { code: "JPY", name: "Yen japonais", symbol: "¥" },
  { code: "CAD", name: "Dollar canadien", symbol: "C$" },
  { code: "AUD", name: "Dollar australien", symbol: "A$" },
  { code: "CNY", name: "Yuan chinois", symbol: "¥" },
  { code: "INR", name: "Roupie indienne", symbol: "₹" },
  { code: "MXN", name: "Peso mexicain", symbol: "$" },
  { code: "BRL", name: "Real brésilien", symbol: "R$" },
  { code: "KRW", name: "Won sud-coréen", symbol: "₩" },
  { code: "SGD", name: "Dollar singapourien", symbol: "S$" },
  { code: "HKD", name: "Dollar de Hong Kong", symbol: "HK$" },
  { code: "NOK", name: "Couronne norvégienne", symbol: "kr" },
  { code: "SEK", name: "Couronne suédoise", symbol: "kr" },
  { code: "DKK", name: "Couronne danoise", symbol: "kr" },
  { code: "NZD", name: "Dollar néo-zélandais", symbol: "NZ$" },
  { code: "ZAR", name: "Rand sud-africain", symbol: "R" },
  { code: "PLN", name: "Zloty polonais", symbol: "zł" },
];

type ExchangeRates = {
  [key: string]: number;
};

function AdBanner({ position }: { position: string }) {
  return (
    <div className="ad-placeholder rounded p-4 flex items-center justify-center min-h-[90px]">
      <div className="text-center">
        <p className="text-muted-foreground text-sm">Publicité - {position}</p>
      </div>
    </div>
  );
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("CHF");
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${fromCurrency}`
      );
      if (!response.ok) throw new Error("Erreur lors de la récupération des taux");
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date());
    } catch {
      setError("Impossible de récupérer les taux de change");
    } finally {
      setLoading(false);
    }
  }, [fromCurrency]);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const convertedAmount = amount && rates[toCurrency]
    ? (parseFloat(amount) * rates[toCurrency]).toFixed(2)
    : "0.00";

  const rate = rates[toCurrency] ? rates[toCurrency].toFixed(4) : "—";

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencyInfo = (code: string) =>
    currencies.find((c) => c.code === code);

  const popularPairs = [
    { from: "USD", to: "EUR" },
    { from: "USD", to: "CHF" },
    { from: "EUR", to: "CHF" },
    { from: "GBP", to: "EUR" },
    { from: "USD", to: "GBP" },
    { from: "EUR", to: "GBP" },
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
                <Wrench className="w-4 h-4 text-background" />
              </div>
              <span className="text-lg font-semibold">ToolBox</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Connexion
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <AdBanner position="Header Banner" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="hidden xl:block w-[160px] shrink-0">
            <div className="sticky top-20">
              <div className="ad-placeholder rounded p-2 flex items-center justify-center min-h-[600px]">
                <p className="text-muted-foreground text-xs">Pub</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded bg-foreground flex items-center justify-center">
                  <Coins className="w-5 h-5 text-background" />
                </div>
                <h1 className="text-2xl font-semibold">Convertisseur de Devises</h1>
              </div>
              <p className="text-muted-foreground text-sm">
                Taux de change en temps réel • Données mises à jour automatiquement
              </p>
            </motion.div>

            <Card className="p-6 mb-6">
              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Montant</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="text-lg"
                    />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getCurrencyInfo(fromCurrency)?.name}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  className="mb-6"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Convertir en</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={loading ? "..." : convertedAmount}
                      readOnly
                      className="text-lg bg-secondary/30"
                    />
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getCurrencyInfo(toCurrency)?.name}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded">
                  {error}
                </div>
              )}

              <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  1 {fromCurrency} = <span className="font-medium text-foreground">{rate}</span> {toCurrency}
                </div>
                <div className="flex items-center gap-2">
                  {lastUpdate && (
                    <span className="text-xs text-muted-foreground">
                      Mis à jour: {lastUpdate.toLocaleTimeString("fr-FR")}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchRates}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mb-6">
              <AdBanner position="Mid Content" />
            </div>

            <Card className="p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Paires populaires</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularPairs.map((pair, index) => {
                  const pairRate = pair.from === fromCurrency && rates[pair.to]
                    ? rates[pair.to]
                    : null;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setFromCurrency(pair.from);
                        setToCurrency(pair.to);
                      }}
                      className="p-3 rounded border hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {pair.from}/{pair.to}
                        </span>
                        {pairRate !== null ? (
                          pairRate > 1 ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )
                        ) : null}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getCurrencyInfo(pair.from)?.symbol} → {getCurrencyInfo(pair.to)?.symbol}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">
                Taux depuis {fromCurrency}
              </h2>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Chargement des taux...
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currencies
                    .filter((c) => c.code !== fromCurrency && rates[c.code])
                    .slice(0, 12)
                    .map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setToCurrency(currency.code)}
                        className={`p-3 rounded border text-left transition-colors ${
                          toCurrency === currency.code
                            ? "bg-foreground text-background"
                            : "hover:bg-secondary/50"
                        }`}
                      >
                        <div className="font-medium text-sm">{currency.code}</div>
                        <div className={`text-xs ${toCurrency === currency.code ? "text-background/70" : "text-muted-foreground"}`}>
                          {rates[currency.code]?.toFixed(4)}
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </Card>
          </div>

          <div className="hidden xl:block w-[160px] shrink-0">
            <div className="sticky top-20">
              <div className="ad-placeholder rounded p-2 flex items-center justify-center min-h-[600px]">
                <p className="text-muted-foreground text-xs">Pub</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <AdBanner position="Footer Banner" />
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          <p>© 2024 ToolBox. Données fournies par Frankfurter API (BCE).</p>
        </div>
      </footer>
    </div>
  );
}
