"use client";

import * as React from "react";
import {
  Inbox,
  Send,
  Star,
  Archive,
  Trash2,
  File,
  Settings2,
  Users2,
  Tag,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data for a mail dashboard.
const data = {
  user: {
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    avatar: "/avatars/jane.jpg",
  },
  teams: [
    {
      name: "Personal",
      logo: Users2,
      plan: "Free",
    },
    {
      name: "Work",
      logo: Users2,
      plan: "Business",
    },
  ],
  navMain: [
    {
      title: "Inbox",
      url: "#inbox",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Sent",
      url: "#sent",
      icon: Send,
    },
    {
      title: "Starred",
      url: "#starred",
      icon: Star,
    },
    {
      title: "Drafts",
      url: "#drafts",
      icon: File,
    },
    {
      title: "Archive",
      url: "#archive",
      icon: Archive,
    },
    {
      title: "Spam",
      url: "#spam",
      icon: Tag,
    },
    {
      title: "Trash",
      url: "#trash",
      icon: Trash2,
    },
    {
      title: "Settings",
      url: "#settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
