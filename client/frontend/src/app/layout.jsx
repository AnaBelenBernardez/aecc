import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventos: Participa en nuestros eventos y colabora",
  description:
    "Carreras deportivas, cenas solidarias, sorteos, actividades culturas, y ¡mucho más cerca de tí!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
