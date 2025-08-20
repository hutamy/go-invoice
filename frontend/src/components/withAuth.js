import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    // If authentication is still loading, display loading state
    if (isLoading) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        router.replace("/");
      }
      return null;
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}
