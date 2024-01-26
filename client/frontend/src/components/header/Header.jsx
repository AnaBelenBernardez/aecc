"use client";

import Image from "next/image";
import Link from "next/link";
import { Burger, Logout } from "../../lib/svg";
import { useLoginStore, useUIStore } from "../../store";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  const openMenu = useUIStore((state) => state.openSideMenu);
  const logout = () => {
    useLoginStore.setState({ token: null });
    router.push("/admin");
  };
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
            <div className="flex gap-2">
            {token && (
                <button onClick={logout}>
                  <Logout />
                </button>
              )}
            {token && (
              <Link href="/admin/dashboard"
                >
                  <Image src="/image/dashboard.png" alt="Logo Dashboard" width="25" height="25"></Image>
                
              </Link>
              )}
              <p>ES</p>
              <p>|</p>
              <p>GAL</p>
            </div>
            <div className="my-4 hidden lg:flex lg:gap-7">
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                Inicio
              </Link>
              <Link
                href="/calendario-e-inscripciones"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                Calendario e inscripciones
              </Link>
              <Link
                href="/galeria"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                Galería
              </Link>
              <Link
                href="/faq"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                FAQ
              </Link>
              <Link
                href="https://www.contraelcancer.es/es/colabora/voluntariado"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
                target="_blank"
              >
                Voluntarios
              </Link>
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                Patrocinios
              </Link>
              <Link
                href="/noticias"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
              >
                Noticias
              </Link>
              <a
                href="https://blog.contraelcancer.es/"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
                target="_blank"
              >
                Blog
              </a>
              <Link
                href="https://www.contraelcancer.es/es/sobre-nosotros/donde-estamos"
                className="hover:text-primaryGreen transition-all duration-300 ease-in-out"
                target="_blank"
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
