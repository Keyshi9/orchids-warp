"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/language-context";

export default function TermsPage() {
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
              <FileText className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-2xl font-semibold">{t.footer.terms}</h1>
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
            <h2 className="text-lg font-medium mb-3">1. Acceptation des conditions</h2>
            <p className="text-sm text-muted-foreground mb-4">
              En accédant et en utilisant Warp, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. 
              Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">2. Description des services</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Warp fournit une collection d&apos;outils en ligne gratuits incluant :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Convertisseur d&apos;unités</li>
              <li>Convertisseur de devises</li>
              <li>Calculatrice scientifique</li>
              <li>Règle de trois</li>
              <li>Sélecteur de couleurs</li>
              <li>Outils de texte</li>
              <li>Générateur de hash</li>
              <li>Générateur de QR code</li>
              <li>Convertisseur de timestamp</li>
              <li>Encodeur/décodeur URL</li>
              <li>Formateur JSON</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">3. Utilisation acceptable</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Vous acceptez d&apos;utiliser Warp uniquement à des fins légales et de manière à ne pas :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Violer les lois applicables</li>
              <li>Tenter de perturber ou endommager nos services</li>
              <li>Utiliser nos outils à des fins malveillantes</li>
              <li>Collecter des données d&apos;autres utilisateurs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">4. Propriété intellectuelle</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tout le contenu de Warp, y compris le code, le design et les fonctionnalités, 
              est protégé par les droits d&apos;auteur. Vous ne pouvez pas reproduire, distribuer 
              ou modifier ce contenu sans autorisation préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">5. Limitation de responsabilité</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Warp est fourni &quot;tel quel&quot; sans garantie d&apos;aucune sorte. Nous ne sommes pas responsables :
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4">
              <li>Des erreurs dans les calculs ou conversions</li>
              <li>Des pertes de données</li>
              <li>Des interruptions de service</li>
              <li>Des dommages directs ou indirects résultant de l&apos;utilisation du service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">6. Disponibilité du service</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nous nous efforçons de maintenir Warp disponible 24h/24, mais nous ne garantissons pas 
              une disponibilité ininterrompue. Nous nous réservons le droit de modifier ou d&apos;interrompre 
              tout service à tout moment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">7. Modifications</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nous nous réservons le droit de modifier ces conditions à tout moment. 
              Les modifications prennent effet dès leur publication sur cette page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">8. Droit applicable</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ces conditions sont régies par le droit français. Tout litige sera soumis 
              à la compétence exclusive des tribunaux français.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-medium mb-3">9. Contact</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Pour toute question concernant ces conditions, utilisez le formulaire de suggestion disponible sur le site.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
