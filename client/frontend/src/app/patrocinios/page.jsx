"use client";

import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";
import useGetAllSponsors from '../../hooks/useGetAllSponsors';
import Image from 'next/image';
import Loading from '../../components/loading/Loading';
import { useEffect, useState } from "react";
import Link from 'next/link';

const Sponsorships = () => {
  const language = useLanguageStore((state) => state.language);
  const {sponsors, loading, error} = useGetAllSponsors();
  const [sponsorsList, setSponsorsList] = useState([]);
  const [scroll, setScroll] = useState(false);

  useEffect(() =>{
    if(sponsors !== undefined){
      const sortedByImportance = [];

      sponsors.map((sponsor) => {
        sponsor.important === 1 ? sortedByImportance.unshift(sponsor) : sortedByImportance.push(sponsor);
      })

      setSponsorsList(sortedByImportance);
    }
	},[sponsors]);

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

  if (loading) return <Loading/>;

  return (
    <div className="mx-5 mb-4 lg:w-3/4 lg:mx-auto md:mx-[38.5px]" id='top'>
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
        {language === "es" ? "Nuestros patrocinadores" : "Os nosos patrocinadores"}
      </h1>
      <section className='flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center'>
        {
          sponsorsList.length > 0
            ? sponsorsList.map((sponsor) => {
              const imgSrc = `${process.env.NEXT_PUBLIC_BACK_URL}/uploads/${sponsor.logo}`
              return (
                <article key={sponsor.id} className='flex flex-col gap-2 shadow-lg pb-6 md:max-w-[320px]'>
                  <div className='w-80 h-40 px-4'>
                    <Image width={150} height={150} alt='Logo patrocinador' src={imgSrc} className='w-80 h-40 object-contain'/>
                  </div>
                  <h2 className='px-6 text-balance font-bold mt-2 text-xl'>{language === 'es' ? sponsor.name : sponsor.galician_name}</h2>
                  <p className='px-6 text-balance'>{language === 'es' ? sponsor.description : sponsor.galician_description}</p>
                </article>
              )
            })
            : null
        }
      </section>
      <section>
        <h2 className='text-2xl font-bold mt-16 mb-4 text-center md:text-3xl lg:mb-8'>
          {language === "es" ? "Ponte en Marcha Contra el Cáncer" : "Ponte en Marcha Contra o Cancro"}
        </h2>
        {language === "es"
          ? <ul className='flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center'>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-lightPink w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/patrocina.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>Patrocina</h2>
                  <p className='pb-4 px-6'>Solidaridad, visiblidad, compromiso. Haz visible tu compromiso con la lucha contra el cáncer patrocinando uno de nuestros eventos solidarios.</p>
                </article>
              </li>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-blueSection w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/participa.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>Participa</h2>
                  <p className='pb-4 px-6'>Ponte en marcha contra el cáncer. Ahora puedes comprar dorsales para tus empleados, tus clientes… tu empresa contra el cáncer.</p>
                </article>
              </li>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-yellowSection w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/aTuManera.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>A tu manera</h2>
                  <p className='pb-4 px-6'>Hay muchas formas de sumarse a un evento solidario, con servicios pro-bono, cediendo espacios publicitarios… juntos encontraremos la tuya.</p>
                </article>
              </li>
            </ul>
          : <ul className='flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center'>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-lightPink w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/patrocina.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>Patrocina</h2>
                  <p className='pb-4 px-6'>Solidariedade, visibilidade, compromiso. Fai visible o teu compromiso coa loita contra o cancro patrocinando un dos nosos eventos solidarios.</p>
                </article>
              </li>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-blueSection w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/participa.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>Participa</h2>
                  <p className='pb-4 px-6'>Ponche en marcha contra o cancro. Agora podes comprar dorsais para os teus empregados, os teus clientes… a túa empresa contra o cancro.</p>
                </article>
              </li>
              <li className='outline outline-1 outline-secondGray md:max-w-[320px]'>
                <article>
                  <div className='bg-yellowSection w-80 h-44'>
                    <Image width={326} height={176} alt='Patrocina' src={'/image/aTuManera.png'}/>
                  </div>
                  <h2 className='font-bold text-lg py-4 px-6'>Á túa maneira</h2>
                  <p className='pb-4 px-6'>Hai moitas formas de sumarse a un evento solidario, con servizos prol-bono, cedendo espazos publicitarios… xuntos atoparemos a túa.</p>
                </article>
              </li>
            </ul>
        }
      </section>
      <div className="mb-4 h-[205vh] md:h-[116vh] lg:h-[155vh] mt-8">
        {language === "es" ? (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNURE5ROFVUMU1MSENZTFJLUFoyVFFMSEhNOS4u&embed=true" 
            className="w-full h-[205vh] md:h-[116vh] lg:h-[155vh]"> 
          </iframe>
        ) : (
          <iframe width="640px" 
            height="480px" 
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=LsqjvExiqkORgfZ_HCeQKUYzyejqVhFMl0l2m9cJWZNURUFBWEtRR09VWEJZNVpVQ1lVRTQwTzRTSy4u&embed=true" 
            className="w-full h-[205vh] md:h-[116vh] lg:h-[155vh]"> 
          </iframe>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Sponsorships), { ssr: false });
