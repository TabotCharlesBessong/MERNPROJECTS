import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Asidebar from "@/components/Asidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/auth-provider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset>
          <main className="w-full">
            <Header />
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
