import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const protectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
};

export default protectedRoute;
