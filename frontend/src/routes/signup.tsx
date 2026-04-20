import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageLayout } from "../components/PageLayout";
import { useAuth } from "../hooks/useAuth";
import "../styles/Auth.css";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — SmartVent" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/",
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    const result = await signup(name, email, password);
    if (result.ok) {
      toast.success("Account created!");
      navigate({ to: redirect });
    } else {
      setError(result.error || "Signup failed");
    }
  };

  return (
    <PageLayout hideFooter>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="navbar-logo-mark" style={{ width: 40, height: 40, fontSize: 16 }}>SV</span>
          </div>
          <h1>Create your account</h1>
          <p className="text-muted">Join SmartVent and breathe smarter.</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="form-group">
              <label>Full name</label>
              <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input className="input" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Create account</button>
          </form>

          <p className="auth-foot">
            Already have an account? <Link to="/login" search={{ redirect }}>Login</Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
