import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

export function PageLayout({ children, hideFooter }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
