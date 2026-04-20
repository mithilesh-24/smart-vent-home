import { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      navigate({ to: "/login", search: { redirect: location.pathname } });
    }
  }, [ready, isAuthenticated, navigate, location.pathname]);

  if (!ready || !isAuthenticated) {
    return (
      <div style={{ padding: 64, textAlign: "center", color: "var(--color-text-muted)" }}>
        Loading…
      </div>
    );
  }
  return <>{children}</>;
}
