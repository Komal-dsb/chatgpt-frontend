"use client";

import * as React from "react";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { chatItem } from "@/types/common";

// This is sample data.
const data = {
  user: {
    name: "Komal Gill",
    email: "test@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "New Chat",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Search Chat",
      url: "#",
      icon: Bot,
    },
    {
      title: "Your Chats",
      url: "#",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({
  chatList,
  ...props
}: {
  chatList: chatItem[];
  props?: React.ComponentProps<typeof Sidebar>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />

        {chatList.length > 0 ? (
          chatList.map((chat, indx) => <p key={indx}> <p className="px-4 text-wrap">{chat?.title} </p></p>)
        ) : (
          <p className="px-4 text-sm">No chat Found</p>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
