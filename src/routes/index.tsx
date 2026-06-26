import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Layers, Sigma, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visual Algebra · An Interactive Textbook" },
      {
        name: "description",
        content:
          "Visual Algebra is an interactive textbook that brings abstract algebra to life through beautiful visualizations.",
      },
    ],
  }),
  component: Home,
});

const cards = [
  {
    title: "Modulo Clock Calculator",
    description: "Explore cyclic groups Z_n interactively. Click numbers on the clock to see orders and generators.",
    icon: Clock,
    href: "/clock",
    badge: "Ready",
    badgeVariant: "default" as const,
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
  },
  {
    title: "Subgroup & Coset Finder",
    description: "Visualize subgroups, compute cosets, and explore Lagrange's theorem.",
    icon: Layers,
    href: "/subgroups",
    badge: "Preview",
    badgeVariant: "secondary" as const,
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "What is Visual Algebra?",
    description: "An interactive textbook that makes abstract algebra tangible through dynamic visualizations and hands-on tools.",
    icon: Sigma,
    href: null,
    badge: null,
    badgeVariant: "outline" as const,
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
];

function Home() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t.common.tagline}
        </div>
        <h1 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t.common.appName}
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          {t.common.appSubtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {cards.map((card) => (
          <Card
            key={card.title}
            className={`group relative overflow-hidden border-primary/5 bg-gradient-to-br ${card.gradient} ${card.colSpan ?? ""} ${card.rowSpan ?? ""} ${card.href ? "cursor-pointer transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5" : ""}`}
          >
            {card.href ? (
              <Link to={card.href} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15">
                      <card.icon className="h-6 w-6" />
                    </div>
                    {card.badge && (
                      <Badge variant={card.badgeVariant} className="text-[10px] uppercase tracking-wider">
                        {card.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4 text-xl tracking-tight">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </CardContent>
              </Link>
            ) : (
              <div className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <card.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-xl tracking-tight">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
