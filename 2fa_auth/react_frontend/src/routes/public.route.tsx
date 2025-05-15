import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import { Loader } from "lucide-react";

const PublicRoute = () => {
  const { data, isLoading } = useAuth();
  const user = data?.data?.user;

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[rgba(255,255,255,.2)] text-2xl">
        <Loader size="30px" className="animate-spin" />
        Loading Squeezy...
      </div>
    );
  }
  return !user ? <Outlet /> : <Navigate to="/home" replace />;
};

export default PublicRoute;
