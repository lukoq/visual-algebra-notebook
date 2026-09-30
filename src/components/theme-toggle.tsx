import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={mounted ? (theme === "dark" ? t.theme.toLight : t.theme.toDark) : t.theme.toggle}
      title={mounted ? (theme === "dark" ? t.theme.toLight : t.theme.toDark) : t.theme.toggle}
      className={cn("text-muted-foreground hover:bg-primary/10 hover:text-primary", className)}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  );
}
