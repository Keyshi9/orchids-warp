"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Users, Settings, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminPage() {
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
            <span className="text-lg font-semibold">Warp</span>
          </div>
          <div className="flex items-center gap-2">
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
            <h1 className="text-2xl font-semibold">Panel Admin</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Gérez votre application Warp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <Users className="w-8 h-8 mb-4" />
            <h3 className="font-medium mb-1">Utilisateurs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gérer les utilisateurs
            </p>
            <Button variant="outline" size="sm">
              Voir
            </Button>
          </Card>

          <Card className="p-6">
            <BarChart3 className="w-8 h-8 mb-4" />
            <h3 className="font-medium mb-1">Statistiques</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Voir les analytics
            </p>
            <Button variant="outline" size="sm">
              Voir
            </Button>
          </Card>

          <Card className="p-6">
            <Settings className="w-8 h-8 mb-4" />
            <h3 className="font-medium mb-1">Paramètres</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configuration
            </p>
            <Button variant="outline" size="sm">
              Voir
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
