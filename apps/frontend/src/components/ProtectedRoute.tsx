import React from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const authenticated = isAuthenticated();

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}; 