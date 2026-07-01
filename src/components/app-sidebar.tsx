import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Clock, Layers, Shuffle, Lock, Sigma, ArrowRightLeft, Book } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useI18n } from "@/i18n/I18nProvider";
import type { Dictionary } from "@/i18n/translations";

type Tool = {
  key: keyof Dictionary["menu"];
  url: string;
  icon: typeof Clock;
  disabled?: boolean;
};

const tools: Tool[] = [
  { key: "homeTool", url: "/", icon: Home },
  { key: "notesTool", url: "/notes", icon: Book },
  { key: "homomorphismTool", url: "/homomorphisms", icon: ArrowRightLeft },
  { key: "notesTool2", url: "/notes-2", icon: Book },
  { key: "clockTool", url: "/clock", icon: Clock },
  { key: "notesTool3", url: "/notes-3", icon: Book },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <Sigma className="h-5 w-5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="truncate text-sm font-semibold tracking-tight">
              {t.common.appName}
            </div>
            <div className="truncate text-[11px] text-muted-foreground">
              {t.common.appSubtitle}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.menu.tools}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => {
                const active = currentPath === item.url;
                const label = t.menu[item.key];
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={active}
                      disabled={item.disabled}
                      tooltip={label}
                      className="data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:font-medium"
                    >
                      {item.disabled ? (
                        <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{label}</span>
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                            {t.common.soon}
                          </span>
                        </div>
                      ) : (
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{label}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
