import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/translations";

const LANGS: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 rounded-full border border-border/60 bg-card/50 px-3 text-xs font-medium uppercase tracking-wider hover:bg-card"
        >
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={
              locale === l.code
                ? "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary"
                : ""
            }
          >
            <span className="font-mono text-xs uppercase mr-2 text-muted-foreground">
              {l.code}
            </span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
