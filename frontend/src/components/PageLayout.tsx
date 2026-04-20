import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageLayout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
