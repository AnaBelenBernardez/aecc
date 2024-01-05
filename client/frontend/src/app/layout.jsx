import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
});

export const metadata = {
  title: "Eventos: Participa en nuestros eventos y colabora",
  description:
    "Carreras deportivas, cenas solidarias, sorteos, actividades culturas, y ¡mucho más cerca de tí!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
