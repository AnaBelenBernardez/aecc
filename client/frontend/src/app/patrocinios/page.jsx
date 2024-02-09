"use client";

import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const Sponsorships = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-5 mb-4 lg:w-3/4 lg:mx-auto md:mx-[38.5px]">
      <h1 className="font-bold text-primaryGreen text-xl py-4 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0">
        Patrocinios
      </h1>
      <p className="text-lg font-medium mb-8">
        {language === "es"
          ? `¿Eres una empresa? Patrocina o participa en un evento y genera un
        impacto positivo en la lucha contra el cáncer, y en tu propia empresa.`
          : `Es unha empresa? Patrocina ou participa nun evento e xera un impacto positivo na loita contra o cancro, e na túa propia empresa.`}
      </p>
      <div className="mb-4">
        {language === "es" ? (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/fn1RjUeGEr?embed=true"
            className="w-full h-screen"
          >
            {" "}
          </iframe>
        ) : (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/VkFMmy4wpP?embed=true"
            className="w-full h-screen"
          >
            {" "}
          </iframe>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Sponsorships), { ssr: false });
