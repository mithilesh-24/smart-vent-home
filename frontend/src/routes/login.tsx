import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageLayout } from "../components/PageLayout";
import { useAuth } from "../hooks/useAuth";
import "../styles/Auth.css";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — SmartVent" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/",
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.ok) {
      toast.success("Welcome back!");
      navigate({ to: redirect });
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <PageLayout hideFooter>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="navbar-logo-mark" style={{ width: 40, height: 40, fontSize: 16 }}>SV</span>
          </div>
          <h1>Welcome back</h1>
          <p className="text-muted">Login to access your dashboard and orders.</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
          </form>

          <p className="auth-foot">
            New to SmartVent? <Link to="/signup" search={{ redirect }}>Create an account</Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
