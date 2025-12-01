"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ProtectRoutes {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectRoutes) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
