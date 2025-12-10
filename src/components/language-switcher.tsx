"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";

const languages: { code: Language; name: string; abbr: string }[] = [
  { code: "fr", name: "Français", abbr: "FR" },
  { code: "en", name: "English", abbr: "EN" },
  { code: "de", name: "Deutsch", abbr: "DE" },
  { code: "es", name: "Español", abbr: "ES" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const current = languages.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-12 h-9 font-medium">
          {current?.abbr}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLang(language.code)}
            className={lang === language.code ? "bg-secondary" : ""}
          >
            <span className="mr-2 font-mono text-xs">{language.abbr}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}