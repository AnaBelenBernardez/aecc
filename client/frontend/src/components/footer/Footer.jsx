import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
import LinkYoutube from "./LinksRRSS/LinkYoutube";
import LinkFacebook from "./LinksRRSS/LinkFacebook";
import LinkTwitter from "./LinksRRSS/LinkTwitter";
import LinkInstagram from "./LinksRRSS/LinkInstagram";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 flex flex-col items-center text-center bg-secondLightGray py-8 lg:flex-row lg:items-start lg:justify-around lg:text-left">
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
          <Link href="https://www.facebook.com/contraelcancer.es" target='_blank'>
            <LinkFacebook />
          </Link>
          <Link href="https://twitter.com/ContraCancerEs" target='_blank'>
            <LinkTwitter />
          </Link>
          <Link href="https://www.instagram.com/contraelcancer.es/" target='_blank'>
            <LinkInstagram />
          </Link>
          <Link href="https://www.youtube.com/user/aecc" target='_blank'>
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
          <Link
            href="https://www.contraelcancer.es/es/colabora/voluntariado"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
            target='_blank'
          >
            <li>¿Eres voluntario?</li>
          </Link>
          <Link
            href="https://colabora.contraelcancer.es/empresas/eventos-solidarios"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
            target='_blank'
          >
            <li>Quiero patrocinar un evento</li>
          </Link>
          <Link
            href="https://www.contraelcancer.es/es/sobre-nosotros/donde-estamos"
            target='_blank'
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
          >
            <li>Contacto</li>
          </Link>
        </ul>
      </section>
      <section>
        <h2 className="font-extrabold mb-2">NO TE PIERDAS NADA</h2>
        <ul className="flex flex-col gap-2">
          <Link href="/noticias" className="hover:text-primaryGreen transition-all duration-300 ease-in-out">
            <li>Noticias</li>
          </Link>
          <Link
            href="https://blog.contraelcancer.es/"
            className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
            target='_blank'
          >
            <li>Blog</li>
          </Link>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
