"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatView } from "@/components/chat-view"
import { AddExpenseView } from "@/components/add-expense-view"
import { PlaceholderView } from "@/components/placeholder-view"
import { ManageStudentsView } from "@/components/manage-students-view"
import { AddIncomeView } from "@/components/add-income-view"

export type NavigationItem =
  | "chat"
  | "add-expense"
  | "add-income"
  | "manage-students"
  | "manage-enrollments"
  | "calendar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<NavigationItem>("chat")

  const renderContent = () => {
    switch (activeItem) {
      case "chat":
        return <ChatView />
      case "add-expense":
        return <AddExpenseView />
      case "add-income":
        return <AddIncomeView />
      case "manage-students":
        return <ManageStudentsView />
      case "manage-enrollments":
        return <PlaceholderView title="Manage Enrollments" />
      case "calendar":
        return <PlaceholderView title="Calendar" />
      default:
        return <ChatView />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </SidebarProvider>
  )
}
