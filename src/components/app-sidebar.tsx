import { Link, useRouterState } from "@tanstack/react-router";
import { 
  Home, 
  Clock, 
  Layers,
  FlaskConical, 
  ArrowRightLeft, 
  ChartSpline, 
  Key, 
  NotepadText  
} from "lucide-react";

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
import { cn } from "@/lib/utils";


type Site = {
  key: keyof Dictionary["menu"];
  url: string;
  icon: typeof Clock;
  disabled?: boolean;
  kind: "note" | "tool";
};
const start: Site[] = [
  { key: "homeTool", url: "/", icon: Home, kind: "note" }
];
const tools: Site[] = [
  { key: "homomorphismTool", url: "/homomorphisms", icon: ArrowRightLeft, kind: "tool" },
  { key: "clockTool", url: "/clock", icon: Clock, kind: "tool" },
  { key: "subgroupTool", url: "/subgroups", icon: Layers, kind: "tool" },
  { key: "rsaTool", url: "/rsa-simulation", icon: Key, kind: "tool" },
  { key: "eccTool", url: "/ecc-calculator", icon: ChartSpline, kind: "tool" },
  { key: "diracNotation", url: "/dirac-notation-lab", icon: FlaskConical, kind: "tool" },
];
const notes: Site[] = [
  { key: "notesTool", url: "/notes", icon: NotepadText, kind: "note"},
  { key: "notesTool2", url: "/notes-2", icon: NotepadText, kind: "note" },
  { key: "notesTool3", url: "/notes-3", icon: NotepadText, kind: "note" },
  { key: "notesTool4", url: "/notes-4", icon: NotepadText, kind: "note" },
  { key: "notesTool5", url: "/notes-5", icon: NotepadText, kind: "note" },
  { key: "notesTool6", url: "/notes-6", icon: NotepadText, kind: "note" },
  { key: "notesTool7", url: "/notes-7", icon: NotepadText, kind: "note" },
  { key: "notesTool8", url: "/notes-8", icon: NotepadText, kind: "note" },
  { key: "notesTool9", url: "/notes-9", icon: NotepadText, kind: "note" },
  { key: "notesTool10", url: "/notes-10", icon: NotepadText, kind: "note" },
  { key: "notesTool11", url: "/notes-11", icon: NotepadText, kind: "note" },
  { key: "notesTool12", url: "/notes-12", icon: NotepadText, kind: "note" },
  { key: "notesTool13", url: "/notes-13", icon: NotepadText, kind: "note" },
  { key: "notesTool14", url: "/notes-14", icon: NotepadText, kind: "note" },
  { key: "notesTool15", url: "/notes-15", icon: NotepadText, kind: "note" },
  { key: "notesTool16", url: "/notes-16", icon: NotepadText, kind: "note" },
  { key: "notesTool17", url: "/notes-17", icon: NotepadText, kind: "note" },
];
export function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="relative right-3 flex items-center gap-2 px-2 py-3">

          <div className="min-w-0 ml-3 group-data-[collapsible=icon]:hidden">
            <div className="truncate text-sm font-semibold tracking-tight">
              {t.common.appName}
            </div>
            <div className="truncate text-[11px] text-muted-foreground">
              {t.common.appSubtitle}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
       
        <SidebarGroup>
          <SidebarMenu className="mb-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={currentPath === start[0].url}
              tooltip={t.menu[start[0].key]}
              className={cn(
                "data-[active=true]:text-primary data-[active=true]:font-medium",
                "hover:bg-primary/10 data-[active=true]:bg-primary/20"
              )}
            >
              <Link to={start[0].url} className="flex items-center gap-2">
                <Home className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  {t.menu[start[0].key]}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
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
                      className={cn(
                        "data-[active=true]:text-primary data-[active=true]:font-medium",
                        "data-[active=true]:bg-primary/20 ring-1 ring-primary/10"
                      )}
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

          <SidebarGroupLabel>{t.menu.notes}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map((item) => {
                const active = currentPath === item.url;
                const label = t.menu[item.key];
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={active}
                      disabled={item.disabled}
                      tooltip={label}
                      className={cn("data-[active=true]:text-primary data-[active=true]:font-medium")}
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
