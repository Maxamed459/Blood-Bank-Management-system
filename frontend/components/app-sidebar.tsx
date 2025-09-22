"use client";

import * as React from "react";
import {
  IconChartBar,
  IconClipboardPlus,
  IconDashboard,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUserStar,
  IconShield,
  IconDropletQuestion,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMainAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Create admin",
      url: "/dashboard/create-admin",
      icon: IconShield,
    },
    {
      title: "Create staff ",
      url: "/dashboard/create-staff",
      icon: IconUserStar,
    },

    {
      title: "Staff",
      url: "/dashboard/staff",
      icon: IconUsers,
    },
    {
      title: "Add blood record",
      url: "/dashboard/blood-record",
      icon: IconClipboardPlus,
    },
    {
      title: "Donors",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Request Blood",
      url: "/dashboard/request-blood",
      icon: IconDropletQuestion,
    },
    {
      title: "Users",
      url: "#",
      icon: IconUsers,
    },
  ],
  navMainStaff: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Add blood record",
      url: "/dashboard/blood-record",
      icon: IconUsers,
    },
    {
      title: "Donors",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Request Blood",
      url: "/dashboard/request-blood",
      icon: IconDropletQuestion,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
  ],
  navMainUser: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Request Blood",
      url: "/dashboard/request-blood",
      icon: IconDropletQuestion,
    },
  ],
  navSecondary: [
    {
      title: "setting",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-6"
            >
              <Link href="#">
                <Image
                  src="/logo-white.png"
                  alt="Logo"
                  width={130}
                  height={18}
                  className="block dark:hidden"
                />
                <Image
                  src="/logo-dark.png"
                  alt="Logo Dark"
                  width={130}
                  height={18}
                  className="hidden dark:block"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            user?.role === "ADMIN"
              ? data.navMainAdmin
              : user?.role === "STAFF"
              ? data.navMainStaff
              : user?.role === "USER"
              ? data.navMainUser
              : []
          }
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
