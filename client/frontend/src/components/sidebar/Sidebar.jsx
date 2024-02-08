"use client";

import clsx from "clsx";
import Link from "next/link";
import { useLoginStore, useUIStore } from "../../store";
import { Close, Logout } from "../../lib/svg";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const token = useLoginStore((state) => state.token);
  const logout = () => {
    useLoginStore.setState({ token: null });
    useLoginStore.setState({ id: null });
    router.push("/admin");
    closeMenu();
  };

  return (
    <>
      {isSideMenuOpen && (
        <div>
          {/*Sidemenu*/}
          <nav
            className={clsx(
              "fixed p-5 right-0 top-0 w-full max-h-svh bg-white z-[2] shadow-2xl transform transition-all duration-300 flex flex-col justify-center items-center",
              {
                "translate-x-full": !isSideMenuOpen,
              }
            )}
          >
            <button
              className="absolute top-5 right-10 cursor-pointer"
              onClick={closeMenu}
            >
              <Close />
            </button>

            {/*Menu*/}
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Inicio</span>
            </Link>
            <Link
              href="/calendario-e-inscripciones"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Calendario e inscripciones</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Galeria</span>
            </Link>
            <Link
              href="/faq"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">FAQ</span>
            </Link>
            <Link
              href="/voluntarios"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Voluntarios</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Patrocinios</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Noticias</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Blog</span>
            </Link>
            <Link
              href="https://www.contraelcancer.es/es/sobre-nosotros/donde-estamos"
              target="_blank"
              className="flex items-center mt-5 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
              onClick={closeMenu}
            >
              <span className="ml-3 text-xl">Contacto</span>
            </Link>
            {token && (
              <button className="my-5" onClick={logout}>
                <Logout />
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
