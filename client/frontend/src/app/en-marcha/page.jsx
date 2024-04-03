"use client"

import { useLanguageStore } from '../../store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EnMarcha = () => {
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
    <main className='mx-5 lg:mx-32'>
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
      <div className='mt-8 flex flex-col gap-12 lg:flex-row max-xl:landscape:flex-col' id='top'>
        <section className='bg-primaryGreen text-secondLightGray p-4 flex flex-col gap-4 md:p-8 lg:w-4/5 lg:justify-evenly max-xl:landscape:w-full'>
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {language === "es"
              ? "Muévete contra el cáncer!"
              : "Móvete contra o cancro!"
            }
          </h2>
          <p className="text-justify md:text-xl">
            {
              language === "es"
                ? `A Coruña en Marcha contra el cáncer es una iniciativa 100% solidaria de la Asociación Española Contra el
                    Cáncer que recauda fondos para mejorar la vida de los pacientes y familias.`
                : `A Coruña en Marcha contra o cancro é unha iniciativa 100% solidaria da Asociación Española Contra
                    o Cancro que recada fondos para mellorar a vida dos pacientes e familias.`
            }
          </p>
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {
              language === "es"
                ? "En marcha por la solidaridad"
                : "En marcha pola solidariedade"
            }
          </h2>
          <p className="text-justify md:text-xl">
            {
              language === "es"
                ? `En 2023 contamos con el apoyo de más de 14.500 participantes y 250 personas voluntarias en 25 localidades.
                    Gracias a su esfuerzo y compromiso, logramos recaudar más de 297.000 euros, fondos destinados a la investigación
                    contra el cáncer y al apoyo directo a pacientes y sus familias.`
                : `En 2023 contamos co apoio de máis de 14.500 participantes e 250 persoas voluntarias en 25 localidades.
                    Grazas ao seu esforzo e compromiso, logramos recadar máis de 297.000 euros, fondos destinados á investigación contra
                    o cancro e ao apoio directo a pacientes e as súas familias.`
            }
          </p>
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {
              language === "es"
                ? "Pon tu grano de arena y participa"
                : "Pon o teu gran de area e participa"
            }
          </h2>
          <p className="text-justify md:text-xl">
            {language === "es"
              ? `¿Quieres ser parte de este movimiento solidario? No te pierdas nuestras próximas actividades.
                  Visita nuestro calendario de eventos y encuentra el más cercano.`
              : `Queres ser parte deste movemento solidario? Non te perdas nosas próximas actividades.
                  Visita o noso calendario de eventos e atopa o máis próximo.`
            }
          </p>
          <Link href={'/calendario-e-inscripciones'} className='self-center my-4 md:mb-2'>
            <button className='bg-secondLightGray text-primaryBlack font-bold rounded-3xl text-sm px-10 py-2 hover:text-primaryGreen md:text-lg'>
              {
                language === "es" ? "IR AL CALENDARIO" : "IR O CALENDARIO"
              }
            </button>
          </Link>
        </section>
        <div className='w-auto h-full lg:h-[revert-layer]'>
          <Image src={'/image/enMarcha.jpg'} alt='Imagen en marcha' width={800} height={800} className='w-auto h-full lg:h-[revert-layer] object-cover'/>
        </div>
      </div>
      <h3 className="text-2xl font-bold my-8 mb-10 md:text-3xl lg:flex lg:w-full lg:mb-14">
        {language === "es"
          ? "Nuestra misión: apoyo, investigación y prevención"
          : "A nosa misión: apoio, investigación y prevención"}
      </h3>
      <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-3 container mb-16 max-md:landscape:grid-cols-1 max-md:landscape:justify-items-center">
        <div className="flex flex-col items-center gap-5 h-full max-md:landscape:w-[50%]">
          <div className="w-[120px] h-[120px] object-contain border-2 p-6 border-primaryGreen rounded-full flex items-center">
            <Image
              src={'/image/apoya.png'}
              width={120}
              height={120}
              className="object-contain w-[120px] h-[120px]"
              alt="Icono"
            />
          </div>
          <p className="text-sm mx-5">
            {language === "es"
              ? "Apoyar  y acompañar a pacientes y sus familias mediante nuestros programas y servicios gratuitos de atención psicológica, social, logopedia, fisioterapia y nutrición."
              : "Apoiar  e acompañar a pacientes e as súas familias mediante os nosos programas e servizos gratuítos de atención psicolóxica, social, logopedia, fisioterapia e nutrición."}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 h-full max-md:landscape:w-[50%]">
          <div className="w-[120px] h-[120px] object-contain border-2 p-6 border-primaryGreen rounded-full flex items-center">
            <Image
              src={'/image/habitos.png'}
              width={120}
              height={120}
              className="object-contain w-[120px] h-[120px]"
              alt="Icono"
            />
          </div>
          <p className="text-sm mx-5">
            {language === "es"
              ? "Educar en hábitos de vida saludables y prevención del cáncer."
              : "Educar en hábitos de vida saudables e prevención do cancro."}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 h-full max-md:landscape:w-[50%]">
          <div className="w-[120px] h-[120px] object-contain border-2 p-6 border-primaryGreen rounded-full flex items-center">
            <Image
              src={'/image/ciencia.png'}
              width={120}
              height={120}
              className="object-contain w-[120px] h-[120px]"
              alt="Icono"
            />
          </div> 
          <p className="text-sm mx-5">
            {language === "es"
              ? "Fomentar la investigación oncológica para aumentar las tasas de supervivencia y la calidad de vida de pacientes y familias."
              : "Fomentar a investigación oncolóxica para aumentar as taxas de supervivencia e a calidade de vida de pacientes e familias."}
          </p>
        </div>  
      </div>
    </main>
  )
};

export default EnMarcha;