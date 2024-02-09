"use client";

import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const Contact = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-5 mb-4 lg:w-3/4 lg:mx-auto md:mx-[38.5px]">
      <h1 className="font-bold text-primaryGreen text-xl py-4 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0">
        Contacto
      </h1>
      <div className="mb-4 lg:mb-8">
        {language === "es" ? (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/9n22D0fXyf?embed=true"
            className="w-full h-screen"
          >
            {" "}
          </iframe>
        ) : (
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/r/BLP7tLJBEn?embed=true"
            className="w-full h-screen"
          >
            {" "}
          </iframe>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Contact), { ssr: false });
