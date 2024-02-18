"use client";

import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const Contact = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-5 mb-4 lg:w-3/4 lg:mx-auto md:mx-[38.5px]">
      <h1 className="font-bold text-primaryGreen text-2xl text-center py-4 md:text-3xl md:py-6 lg:text-left">
        Contacto
      </h1>
      <div className="mb-4 lg:mb-8 h-[212.6vh] md:h-[125.3vh] lg:h-[162vh]">
        {language === "es" ? (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/9n22D0fXyf?embed=true"
            className="w-full h-[212.6vh] md:h-[125.3vh] lg:h-[162vh]"
          >
            {" "}
          </iframe>
        ) : (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/BLP7tLJBEn?embed=true"
            className="w-full h-[212.6vh] md:h-[125.3vh] lg:h-[162vh]"
          >
            {" "}
          </iframe>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Contact), { ssr: false });
