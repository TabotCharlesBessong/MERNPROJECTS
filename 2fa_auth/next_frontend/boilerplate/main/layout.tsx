"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Asidebar from "./components/Asidebar";
import Header from "./components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Asidebar />
      <SidebarInset>
        <main className="w-full">
          <Header />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
