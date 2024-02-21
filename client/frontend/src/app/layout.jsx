import { Raleway } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer/Footer";
import { Sidebar } from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
});

export const metadata = {
  title: "Asociación Española Contra el Cáncer A Coruña",
  description:
    "Seguimos contigo. Mantenemos nuestros servicios en nuestros canales telefónico (981 14 27 40) y Online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-K6G3270VC8" />
    </html>
  );
}
