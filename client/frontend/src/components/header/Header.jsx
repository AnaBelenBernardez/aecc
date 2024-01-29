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
      <nav className="bg-secondLightGray pt-6 pb-2 relative">
        <div className="container mx-auto flex">
          <div className="flex-grow self-center">
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
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                Inicio
              </Link>
              <Link
                href="/calendario-e-inscripciones"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                Calendario e inscripciones
              </Link>
              <Link
                href="/galeria"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                Galería
              </Link>
              <Link
                href="/faq"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                FAQ
              </Link>
              <Link
                href="https://www.contraelcancer.es/es/colabora/voluntariado"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
                target="_blank"
              >
                Voluntarios
              </Link>
              <Link
                href="/"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                Patrocinios
              </Link>
              <Link
                href="/noticias"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
              >
                Noticias
              </Link>
              <a
                href="https://blog.contraelcancer.es/"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
                target="_blank"
              >
                Blog
              </a>
              <Link
                href="https://www.contraelcancer.es/es/sobre-nosotros/donde-estamos"
                className="hover:text-primaryGreen transition-all duration-500 ease-in-out relative after:bg-primaryGreen after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer pb-0.5"
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
