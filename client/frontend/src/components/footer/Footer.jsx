import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
import LinkYoutube from "./LinksRRSS/LinkYoutube";
import LinkFacebook from "./LinksRRSS/LinkFacebook";
import LinkTwitter from "./LinksRRSS/LinkTwitter";
import LinkInstagram from "./LinksRRSS/LinkInstagram";

const Footer = () => {
  return (
    <footer className="w-full https://prod.liveshare.vsengsaas.visualstudio.com/join?FDF07A32B5EB7F964DD759F8F35FD00EE6EBbottom-0 flex flex-col items-center text-center bg-secondLightGray py-8 lg:flex-row lg:items-start lg:justify-around lg:text-left">
      <section className="flex flex-col mb-6">
        <Image
          src="/logos/CC_Logo_transicion_color_pos.rgb.svg"
          alt="Logo Asociación Española Contra el Cáncer"
          width="150"
          height="47"
          className="self-center mb-6 lg:self-start"
        />
        <p className="font-extrabold mb-2">Dirección A Coruña</p>
        <p className="mb-4">Rúa Real, 1, 1°, 15003 A Coruña</p>
        <div className="flex justify-center gap-10">
          <Link href="https://www.facebook.com/contraelcancer.es">
            <LinkFacebook />
          </Link>
          <Link href="https://twitter.com/ContraCancerEs">
            <LinkTwitter />
          </Link>
          <Link href="https://www.instagram.com/contraelcancer.es/">
            <LinkInstagram />
          </Link>
          <Link href="https://www.youtube.com/user/aecc">
            <LinkYoutube />
          </Link>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="font-extrabold mb-2">SOBRE NUESTROS EVENTOS</h2>
        <ul className="flex flex-col gap-2">
          <Link href="/calendario-e-inscripciones"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out">
            <li>Calendario e inscripciones</li>
          </Link>
          <a>
            <li>Preguntas frecuentes</li>
          </a>
          <a>
            <li>¿Eres voluntario?</li>
          </a>
          <Link
            href="https://colabora.contraelcancer.es/empresas/eventos-solidarios"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Quiero patrocinar un evento</li>
          </Link>
          <a>
            <li>Contacto</li>
          </a>
        </ul>
      </section>
      <section>
        <h2 className="font-extrabold mb-2">NO TE PIERDAS NADA</h2>
        <ul className="flex flex-col gap-2">
          <a>
            <li>Noticias</li>
          </a>
          <Link
            href="https://blog.contraelcancer.es/"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Blog</li>
          </Link>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
