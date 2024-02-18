"use client"

import Loading from '../../components/loading/Loading';
import useGetAllAchievements from '../../hooks/useGetAllAchievements';
import { useLanguageStore } from '../../store';
import Link from 'next/link';
import Image from 'next/image';

const EnMarcha = () => {
  const language = useLanguageStore((state) => state.language);
  const {achievements, loading} = useGetAllAchievements();

  if (loading) return <Loading/>;

  return (
    <main className='mx-5 lg:mx-32'>
      <div className='mt-8 flex flex-col gap-12 lg:flex-row'>
        <section className='bg-primaryGreen text-secondLightGray p-4 flex flex-col gap-4 md:p-8 lg:w-2/5'>
          <h2 className="font-bold text-lg">
            {language === "es"
              ? "Muévete contra el cáncer!"
              : "Móvete contra o cancro!"
            }
          </h2>
          <p>
            {
              language === "es"
                ? `A Coruña en Marcha contra el cáncer es una iniciativa 100% solidaria de la Asociación Española Contra el
                    Cáncer que recauda fondos para mejorar la vida de los pacientes y familias.`
                : `A Coruña en Marcha contra o cancro é unha iniciativa 100% solidaria da Asociación Española Contra
                    o Cancro que recada fondos para mellorar a vida dos pacientes e familias.`
            }
          </p>
          <h2 className="font-bold text-lg">
            {
              language === "es"
                ? "En marcha por la solidaridad"
                : "En marcha pola solidariedade"
            }
          </h2>
          <p>
            {
              language === "es"
                ? `En 2023 contamos con el apoyo de más de XXXXX participantes y XXX personas voluntarias en XX localidades.
                    Gracias a su esfuerzo y compromiso, logramos recaudar más de XXXX euros, fondos destinados a la investigación
                    contra el cáncer y al apoyo directo a pacientes y sus familias.`
                : `En 2023 contamos co apoio de máis de XXXXX participantes e XXX persoas voluntarias en XX localidades.
                    Grazas ao seu esforzo e compromiso, logramos recadar máis de XXXX euros, fondos destinados á investigación contra
                    o cancro e ao apoio directo a pacientes e as súas familias.`
            }
          </p>
          <h2 className="font-bold text-lg">
            {
              language === "es"
                ? "Pon tu grano de arena y participa"
                : "Pon o teu gran de area e participa"
            }
          </h2>
          <p>
            {language === "es"
              ? `¿Quieres ser parte de este movimiento solidario? No te pierdas nuestras próximas actividades.
                  Visita nuestro calendario de eventos y encuentra el más cercano.`
              : `Queres ser parte deste movemento solidario? Non te perdas nosas próximas actividades.
                  Visita o noso calendario de eventos e atopa o máis próximo.`
            }
          </p>
          <Link href={'/calendario-e-inscripciones'} className='self-center my-4 md:mb-2'>
            <button className='bg-secondLightGray text-primaryBlack font-bold rounded-3xl text-sm px-10 py-2 hover:text-primaryGreen'>
              {
                language === "es" ? "IR AL CALENDARIO" : "IR O CALENDARIO"
              }
            </button>
          </Link>
        </section>
        <iframe src="https://www.youtube.com/embed/PEv5rcqAArw?si=wKsSXGimsfEEW2Ra" allowFullScreen className='w-full h-[325px] lg:h-auto lg:w-3/5'/>
      </div>
      <h3 className="text-2xl font-bold my-8 mb-10 md:text-3xl lg:flex lg:w-full lg:mb-14">
        {language === "es"
          ? "Nuestra misión: apoyo, investigación y prevención"
          : "A nosa misión: apoio, investigación y prevención"}
      </h3>
      <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-3 container  mb-16">
        <div className="flex flex-col items-center gap-5 h-full">
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
        <div className="flex flex-col items-center gap-5 h-full">
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
        <div className="flex flex-col items-center gap-5 h-full">
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