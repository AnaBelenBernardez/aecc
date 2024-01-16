"use client";

import clsx from "clsx";
import Link from "next/link";
import { useUIStore } from "../../store";
import { Close } from "../../lib/svg";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <>
      {isSideMenuOpen && (
        <div>
          {/*Sidemenu*/}
          <nav
            className={clsx(
              "fixed p-5 right-0 top-0 w-full h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
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
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Calendario e inscripciones</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Galeria</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">FAQ</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Voluntarios</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Patrocinios</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Noticias</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Blog</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:text-primaryGreen rounded transition-all sm:justify-center"
            >
              <span className="ml-3 text-xl">Contacto</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
