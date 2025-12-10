"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Book, Code, Copy, Check } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import { useState } from "react";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-secondary/50 p-4 rounded text-xs overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-background/80 hover:bg-background transition-colors"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

export default function DocsPage() {
  const { t } = useLanguage();

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
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-foreground flex items-center justify-center">
              <Book className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-2xl font-semibold">{t.footer.documentation}</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Guide d&apos;utilisation et documentation technique des outils Warp.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Convertisseur d&apos;unités</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Convertissez entre différentes unités de mesure : longueur, masse, température, surface, volume, vitesse et données.
              </p>
              <h3 className="text-sm font-medium mb-2">Catégories disponibles :</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                <li>Longueur : m, km, cm, mm, mi, ft, in, yd</li>
                <li>Masse : kg, g, mg, lb, oz, t</li>
                <li>Température : °C, °F, K</li>
                <li>Surface : m², km², ha, ft², ac</li>
                <li>Volume : L, mL, m³, gal, qt</li>
                <li>Vitesse : m/s, km/h, mph, kn</li>
                <li>Données : B, KB, MB, GB, TB</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Convertisseur de devises</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Taux de change en temps réel pour plus de 30 devises mondiales.
              </p>
              <h3 className="text-sm font-medium mb-2">API utilisée :</h3>
              <CodeBlock 
                code="GET https://api.exchangerate-api.com/v4/latest/{BASE}"
                language="http"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Les taux sont mis à jour toutes les heures.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Générateur de Hash</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Génère des hashes cryptographiques en utilisant l&apos;API Web Crypto native du navigateur.
              </p>
              <h3 className="text-sm font-medium mb-2">Algorithmes supportés :</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                <li>SHA-1 (160 bits)</li>
                <li>SHA-256 (256 bits)</li>
                <li>SHA-384 (384 bits)</li>
                <li>SHA-512 (512 bits)</li>
              </ul>
              <h3 className="text-sm font-medium mb-2">Exemple de code :</h3>
              <CodeBlock 
                code={`async function hash(text: string, algo: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}`}
                language="typescript"
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Générateur de QR Code</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Créez des QR codes personnalisables avec différentes options de style.
              </p>
              <h3 className="text-sm font-medium mb-2">Options disponibles :</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Couleur de fond et du code</li>
                <li>Taille personnalisable (128-512px)</li>
                <li>Niveau de correction d&apos;erreur (L, M, Q, H)</li>
                <li>Export en PNG</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Formateur JSON</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Validez, formatez et minifiez vos données JSON.
              </p>
              <h3 className="text-sm font-medium mb-2">Fonctionnalités :</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Validation de la syntaxe JSON</li>
                <li>Formatage avec indentation (2 espaces)</li>
                <li>Minification</li>
                <li>Messages d&apos;erreur détaillés</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" />
                <h2 className="text-lg font-medium">Traitement côté client</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Tous les outils Warp fonctionnent entièrement dans votre navigateur. 
                Aucune donnée n&apos;est envoyée à nos serveurs.
              </p>
              <div className="bg-secondary/30 p-4 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>Sécurité :</strong> Vos données restent sur votre appareil. 
                  Nous n&apos;avons accès à aucun fichier ou texte que vous traitez avec nos outils.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
