"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const Volunteers = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-auto mb-4 md:w-[90%] lg:w-3/4">
      <h1 className="font-bold text-primaryGreen text-xl pt-4 mb-4 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0 lg:mb-0">
        Voluntarios
      </h1>
      <div className="flex flex-col gap-8 items-center">
        {language === "es" ? (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/sKKFWhHVTM?embed=true"
            className="w-full h-screen"
          >
            {" "}
          </iframe>
        ) : (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/QDEFfZ6wDh?embed=true"
            className="w-full h-screen"
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
