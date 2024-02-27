"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Volunteers = () => {
  const language = useLanguageStore((state) => state.language);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mx-5 mb-4 md:mx-[38.5px] lg:w-3/4 lg:mx-auto" id='top'>
      {scroll ? (
        <Link href={"#top"}>
          <button className="rounded-full bg-primaryGreen w-11 h-11 flex items-center justify-center fixed bottom-12 right-12 z-[1]">
            <Image
              src={"/image/scrollUp.svg"}
              width={24}
              height={24}
              alt="Volver arriba"
            />
          </button>
        </Link>
      ) : null}
      <h1 className="font-bold text-primaryGreen text-2xl text-center py-4 md:text-3xl md:py-6 lg:text-left">
        Voluntarios
      </h1>
      <div className="flex flex-col gap-8 items-center h-[220vh] md:h-[127vh] lg:h-[161vh]">
        {language === "es" ? (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNUODVJQzcyMDdEUzk2MTczWjRFR1owNFQ0MS4u&embed=true"
            className="w-full h-[220vh] md:h-[127vh] lg:h-[161vh]">
          </iframe>
        ) : (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNUOUtTU0JTWUlDWVRPTkRaVjFWWkxPN0JETC4u&embed=true"
            className="w-full h-[220vh] md:h-[127vh] lg:h-[161vh]"> 
          </iframe>
        )}
        <Link
          href="https://talento.contraelcancer.es/jobs?_ga=2.229474140.1556651381.1704630589-1341541763.1702559712&_gac=1.153648586.1703178197.Cj0KCQiA4Y-sBhC6ARIsAGXF1g4xpShTtR0sJBxL84DCPOi3r5Yxp4L8b5RNz4UegvrMknb6aGAkcKAaAm1IEALw_wcB"
          target="_blank"
        >
          <button className="w-80 mb-4 border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
            {language === "es" ? "VER OFERTAS ABIERTAS" : "VER OFERTAS ABERTAS"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Volunteers), { ssr: false });
