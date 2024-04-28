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

const metadata = {
  title: "Asociación Española Contra el Cáncer A Coruña",
  description:
    "Seguimos contigo. Mantenemos nuestros servicios en nuestros canales telefónicos (981 14 27 40) y Online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:url" content="https://corunaenmarchacontraocancro.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://i.imgur.com/0ZKygSK.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="corunaenmarchacontraocancro.com" />
        <meta property="twitter:url" content="https://corunaenmarchacontraocancro.com/" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://i.imgur.com/0ZKygSK.png" />
      </head>
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
