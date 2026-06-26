import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/subgroups")({
  head: () => ({
    meta: [
      { title: "Subgroup & Coset Finder · Visual Algebra" },
      {
        name: "description",
        content:
          "Explore subgroups and cosets of cyclic groups. Coming soon in the next chapter.",
      },
    ],
  }),
  component: Subgroups,
});

function Subgroups() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-10">
      <Card className="glass-card w-full overflow-hidden">
        <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Layers className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Next Chapter
            </div>
            <h1 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.menu.subgroupTool}
            </h1>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Subgroup & Coset Finder (Coming Soon in Next Chapter)
            </p>
          </div>

          <div className="h-px w-24 bg-border" />

          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground/70">
            This tool will help you visualize subgroups of Z_n, compute cosets,
            and explore Lagrange's theorem interactively.
          </p>

          <Button variant="outline" asChild className="mt-2">
            <Link to="/clock" className="flex items-center gap-2">
              <span>Try the Clock Calculator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
