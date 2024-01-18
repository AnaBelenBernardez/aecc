"use client";

import Image from "next/image";
import Link from "next/link";
import { Burger } from "../../lib/svg";
import { useUIStore } from "../../store";

const Header = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  return (
    <header>
      <nav className="bg-secondLightGray py-6 relative">
        <div className="container mx-auto flex">
          <div className="flex-grow">
            <Image
              src="/logos/CC_Logo_transicion_color_pos.rgb.svg"
              alt="Logo Asociación Española Contra el Cáncer"
              width="150"
              height="150"
              className="self-center"
            />
          </div>

          <div className="flex lg:flex-col lg:items-end items-center justify-center">
            <div className="flex gap-1">
              <p>ES</p>
              <p>|</p>
              <p>GAL</p>
            </div>
            <div className="my-4 hidden lg:block">
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Inicio
              </Link>
              <Link
                href="/calendario-e-inscripciones"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Calendario e inscripciones
              </Link>
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Galería
              </Link>
              <Link
                href="/faq"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                FAQ
              </Link>
              <Link
                href="/voluntarios"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Voluntarios
              </Link>
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Patrocinios
              </Link>
              <Link
                href="https://www.contraelcancer.es/es/actualidad/noticias"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
                target='_blank'
              >
                Noticias
              </Link>
              <a
                href="https://blog.contraelcancer.es/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
                target='_blank'
              >
                Blog
              </a>
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7"
              >
                Contacto
              </Link>
            </div>
            <button className="lg:hidden ml-5" onClick={openMenu}>
              <Burger />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
