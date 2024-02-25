"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import "../../app/globals.css";
import LinkYoutube from "./LinksRRSS/LinkYoutube";
import LinkFacebook from "./LinksRRSS/LinkFacebook";
import LinkTwitter from "./LinksRRSS/LinkTwitter";
import LinkInstagram from "./LinksRRSS/LinkInstagram";
import LinkTikTok from "./LinksRRSS/LinkTikTok";
import { useLanguageStore } from "../../store/language/language.store";

const Footer = () => {
  const pathname = usePathname();
  const language = useLanguageStore((state) => state.language);
  return (
    <footer
      className={`w-full bottom-0 flex flex-col items-center text-center ${
        pathname.startsWith("/admin/") ? "hidden" : ""
      } bg-secondLightGray py-8 lg:flex-row lg:items-start lg:justify-around lg:text-left"`}
    >
      <section className="flex flex-col mb-6">
        <Image
          src="/logos/CC_Logo_transicion_gallego_color_pos.rgb.svg"
          alt="Logo Asociación Española Contra el Cáncer"
          width="180"
          height="47"
          className="self-center mb-6 lg:self-start"
        />
        <p className="font-extrabold mb-2">Dirección A Coruña</p>
        <p className="mb-4">Rúa Real, 1, 1°, 15003 A Coruña</p>
        <div className="flex justify-center gap-10">
          <Link
            href="https://www.facebook.com/contraelcancer.acoruna"
            target="_blank"
          >
            <LinkFacebook />
          </Link>
          <Link href="https://www.twitter.com/ContraCancerAC" target="_blank">
            <LinkTwitter />
          </Link>
          <Link
            href="https://www.instagram.com/contraelcancer.acoruna"
            target="_blank"
          >
            <LinkInstagram />
          </Link>
          <Link
            href="https://www.tiktok.com/@contraelcancer.acoruna"
            target="_blank"
          >
            <LinkTikTok />
          </Link>
          <Link href="https://www.youtube.com/user/aecc" target="_blank">
            <LinkYoutube />
          </Link>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="font-extrabold mb-2">
          {language === "es"
            ? "SOBRE NUESTROS EVENTOS"
            : "SOBRE OS NOSOS EVENTOS"}
        </h2>
        <ul className="flex flex-col gap-2">
          <Link
            href="/calendario-e-inscripciones"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>
              {language === "es"
                ? "Calendario e inscripciones"
                : "Calendario e inscricións"}
            </li>
          </Link>
          <Link
            href="/faq"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Preguntas frecuentes</li>
          </Link>
          <Link
            href="/voluntarios"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>
              {language === "es" ? "¿Eres voluntario?" : "Es voluntario?"}
            </li>
          </Link>
          <Link
            href="/patrocinios"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>
              {language === "es"
                ? "Quiero patrocinar un evento"
                : "Quero patrocinar un evento"}
            </li>
          </Link>
          <Link
            href="/contacto"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Contacto</li>
          </Link>
        </ul>
      </section>
      <section>
        <h2 className="font-extrabold mb-2">
          {language === "es" ? "NO TE PIERDAS NADA" : "NON TE PERDAS NADA"}
        </h2>
        <ul className="flex flex-col gap-2">
          <Link
            href="/noticias"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Noticias</li>
          </Link>
          <Link
            href="https://blog.contraelcancer.es/"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
            target="_blank"
          >
            <li>Blog</li>
          </Link>
        </ul>
      </section>
      <section className="mt-6 lg:mt-0">
        <h2 className="font-extrabold mb-2">LEGAL</h2>
        <ul className="flex flex-col gap-2">
          <Link
            href="/aviso-legal"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Aviso legal</li>
          </Link>
        </ul>
      </section>
    </footer>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
