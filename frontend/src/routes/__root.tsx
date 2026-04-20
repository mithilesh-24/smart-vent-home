import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import globalCss from "../styles/global.css?url";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "16px" }}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: "#0f172a" }}>404</h1>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 8 }}>Page not found</h2>
        <p style={{ color: "#64748b", marginTop: 8 }}>This page doesn't exist or has moved.</p>
        <Link to="/" style={{ display: "inline-block", marginTop: 24, padding: "10px 18px", background: "#2563eb", color: "white", borderRadius: 8, fontWeight: 600 }}>
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SmartVent — Smart Ventilation Systems for Modern Homes" },
      { name: "description", content: "Shop smart fans, IoT sensors, and ventilation controllers. Monitor air quality and automate ventilation in your home." },
      { property: "og:title", content: "SmartVent — Smart Ventilation Systems" },
      { property: "og:description", content: "Smart ventilation hardware and an integrated IoT dashboard for healthier homes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: globalCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}
