"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/language-context";

export default function PrivacyPage() {
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

      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-foreground flex items-center justify-center">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-2xl font-semibold">{t.footer.privacy}</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose prose-sm dark:prose-invert max-w-none"
        >
          <p className="text-muted-foreground mb-6">
            Dernière mise à jour : Décembre 2024
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">1. Introduction</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Bienvenue sur Warp. Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. 
              Cette politique de confidentialité vous informe sur la façon dont nous traitons vos données lorsque vous utilisez notre site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">2. Données collectées</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Warp est conçu pour fonctionner principalement côté client. Nous collectons uniquement :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Données de navigation anonymes (pages visitées, pays d&apos;origine)</li>
              <li>Préférences utilisateur (langue, thème) stockées localement</li>
              <li>Aucune donnée personnelle identifiable n&apos;est collectée</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">3. Utilisation des données</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Améliorer nos services et l&apos;expérience utilisateur</li>
              <li>Comprendre comment nos outils sont utilisés</li>
              <li>Personnaliser votre expérience (langue, thème)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">4. Stockage des données</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Vos préférences sont stockées localement dans votre navigateur (localStorage). 
              Aucune donnée n&apos;est envoyée à des serveurs externes sans votre consentement explicite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">5. Cookies</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Warp n&apos;utilise pas de cookies de suivi. Nous utilisons uniquement le localStorage 
              pour sauvegarder vos préférences utilisateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">6. Services tiers</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Certains outils peuvent utiliser des APIs externes pour fonctionner (ex: taux de change). 
              Ces services ont leurs propres politiques de confidentialité.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">7. Vos droits</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Accéder à vos données</li>
              <li>Supprimer vos données (effacer le localStorage)</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">8. Contact</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Pour toute question concernant cette politique de confidentialité, 
              vous pouvez nous contacter via le formulaire de suggestion sur le site.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
