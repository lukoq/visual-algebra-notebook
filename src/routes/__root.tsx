import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useNavigate,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PagerNavigator } from "@/components/pager-navigator";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider, themeInitScript } from "@/hooks/use-theme";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const NOTE_ROUTES = [
  "/notes-1",
  "/notes-2",
  "/notes-3",
  "/notes-4",
  "/notes-5",
  "/notes-6",
  "/notes-7",
  "/notes-8",
  "/notes-9",
  "/notes-10",
  "/notes-11",
  "/notes-12",
  "/notes-13",
  "/notes-14",
  "/notes-15",
  "/notes-16",
  "/notes-17",
  "/notes-18",
] as const;

function getNoteNumber(pathname: string) {
  const match = /^\/notes-(\d+)\/?$/.exec(pathname);
  if (!match) return null;

  const noteNumber = Number(match[1]);
  return noteNumber >= 1 && noteNumber <= NOTE_ROUTES.length ? noteNumber : null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Ta strona nie może się załadować
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Coś poszło nie tak...
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Spróbuj ponownie
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Wróć
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Visual Algebra Notebook" },
      {
        name: "description",
        content:
          "Learn abstract algebra visually.",
      },
      { name: "author", content: "Visual Algebra" },
      { property: "og:title", content: "Visual Algebra Notebook" },
      {
        property: "og:description",
        content:
          "Learn abstract algebra visually.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const noteNumber = getNoteNumber(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          
            <div className="flex min-h-screen w-full bg-background">
              
              <div className="flex flex-1 flex-col min-w-0">
                <AppHeader />
                <main className={cn("flex flex-1 flex-col", noteNumber !== null && "pb-16")}>
                  <Outlet />
                </main>
              </div>
            </div>
            <NotePager noteNumber={noteNumber} />
          
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

function AppHeader() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-1 border-b border-border bg-background/70 px-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Link 
          to="/notes-10" 
          className="text-sm hover:underline underline-offset-4">
          /notes
        </Link>
        <Link 
          to="/" 
          className="text-sm hover:underline underline-offset-4">
          /info
        </Link>
        <a
          href="https://github.com/lukoq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline underline-offset-4"
        >
          /github.com/lukoq
        </a>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}

function NotePager({ noteNumber }: { noteNumber: number | null }) {
  const navigate = useNavigate();

  if (noteNumber === null) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="glass-card pointer-events-auto rounded-sm px-4 py-2">
        <PagerNavigator
          totalPages={NOTE_ROUTES.length}
          activePage={noteNumber}
          onSelect={(page) => {
            void navigate({ to: NOTE_ROUTES[page - 1] });
          }}
        />
      </div>
    </div>
  );
}
