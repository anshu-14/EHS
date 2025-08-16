import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/common/nav-main"

import { NavUser } from "@/components/common/nav-user"
import { TeamSwitcher } from "@/components/common/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Anshu",
    email: "vishwanshu152000@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Corporate Office",
      logo: GalleryVerticalEnd,
      plan: "Units",
    },
    {
      name: "Vapi",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Daman",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Administartion",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Enterprise Structure",
          url: "/enterprise-structure",
        },
        {
          title: "Enterprise",
           url: "/enterprise",
        },
      ],
    },
    
  ],
  
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
