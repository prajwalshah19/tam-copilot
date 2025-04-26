"use client"

import { Calendar, ClipboardList, DollarSign, MessageSquare, PlusCircle, Users } from "lucide-react"
import type { NavigationItem } from "@/components/main-layout"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  activeItem: NavigationItem
  setActiveItem: (item: NavigationItem) => void
}

export function AppSidebar({ activeItem, setActiveItem }: AppSidebarProps) {
  const navigationItems = [
    {
      id: "chat" as NavigationItem,
      title: "Chat",
      icon: MessageSquare,
    },
    {
      id: "add-expense" as NavigationItem,
      title: "Add Expense",
      icon: PlusCircle,
    },
    {
      id: "add-income" as NavigationItem,
      title: "Add Income",
      icon: DollarSign,
    },
    {
      id: "manage-students" as NavigationItem,
      title: "Manage Students",
      icon: Users,
    },
    {
      id: "manage-enrollments" as NavigationItem,
      title: "Manage Enrollments",
      icon: ClipboardList,
    },
    {
      id: "calendar" as NavigationItem,
      title: "Calendar",
      icon: Calendar,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <h1 className="text-xl font-bold text-primary">TAM Copilot</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton isActive={activeItem === item.id} onClick={() => setActiveItem(item.id)}>
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} The Arbor Montessori</div>
      </SidebarFooter>
      <SidebarRail />
      <SidebarTrigger className="absolute right-0 top-4 translate-x-1/2" />
    </Sidebar>
  )
}
