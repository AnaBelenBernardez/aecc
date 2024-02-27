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
      <div className="mb-4 lg:mb-8 h-[190vh] md:h-[114vh] lg:h-[145vh]">
        {language === "es" ? (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNUM0lGWFBJNENOU1hOQ1dFRE4wWEI0WklYMC4u&embed=true"
            className="w-full h-[190vh] md:h-[114vh] lg:h-[145vh]" 
          >
          </iframe>
        ) : (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNUQ1NHU0xENEdBUThOMkdCNExTOUhOV0lNOC4u&embed=true" 
            className="w-full h-[190vh] md:h-[114vh] lg:h-[145vh]"> 
          </iframe>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Contact), { ssr: false });
