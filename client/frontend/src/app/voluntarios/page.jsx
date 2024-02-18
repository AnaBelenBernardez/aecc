"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const Volunteers = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-5 mb-4 md:mx-[38.5px] lg:w-3/4 lg:mx-auto">
      <h1 className="font-bold text-primaryGreen text-2xl text-center py-4 md:text-3xl md:py-6 lg:text-left">
        Voluntarios
      </h1>
      {
        language === "es"
          ? <p className='text-balance mb-2 md:text-wrap'>¿Te gustaría hacer del mundo un lugar mejor? No lo dudes, haz voluntariado con la Asociación Española Contra el Cáncer.</p>
          : <p className='text-balance mb-2 md:text-wrap'>Gustaríache facer do mundo un lugar mellor? Non o dubides, fai voluntariado coa Asociación Española Contra o Cancro.</p>
      }
      {
        language === "es"
          ? <p className='text-balance mb-4 md:text-wrap'>Rellena este breve formulario y nos pondremos en contacto contigo.</p>
          : <p className='text-balance mb-4 md:text-wrap'>Completa este breve formulario e poñerémonos en contacto contigo.</p>
      }
      <div className="flex flex-col gap-8 items-center h-[226.4vh] md:h-[135.45vh] lg:h-[173vh]">
        {language === "es" ? (
          <iframe
            width="640px"
            height="480vh"
            src="https://forms.office.com/r/sKKFWhHVTM?embed=true"
            className="w-full h-[226.4vh] md:h-[135.45vh] lg:h-[173vh]"
          >
            {" "}
          </iframe>
        ) : (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/QDEFfZ6wDh?embed=true"
            className="w-full h-[226.4vh] md:h-[135.45vh] lg:h-[173vh]"
          >
            {" "}
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
