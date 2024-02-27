"use client"

import { GalleryCard } from "../../components";
import useGetAllEvents from '../../hooks/useGetAllEvents';
import Loading from '../../components/loading/Loading';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguageStore } from '../../store/language/language.store';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const GalleryPage = () => {
  const absolutely = true;
  const { events, loading, error } = useGetAllEvents(absolutely);
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

  const language = useLanguageStore((state) => state.language);
  if (loading) return <Loading/>;

  return (
    <main className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap my-4 lg:mx-10 lg:my-8" id='top'>
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
      {
        events.length > 0 
          ? events.filter((event) => event.event_photos.length > 1).map((event) => {
            return (
              <Link href={`/galeria/${event.id}`} key={event.id}>
                <GalleryCard title={language === 'es' ? event.title : event.galician_title} location={event.location} image={event.event_photos[0]}/>
              </Link>
            )
          })
          : <div className='flex flex-col gap-6 items-center px-6 my-6 lg:flex-row'>
              <Image src={'/image/noPhotosYet.svg'} width={150} height={150} alt='Todavía no hay ninguna foto'/>
              <div>
                <Link href={'/'} className='flex flex-col items-center'>
                  <p className='md:w-3/4 md:mb-4'>{language === 'es' ? 'Actualmente no hay eventos en la galería. Vuelve pronto para poder ver los eventos.'  : 'Actualmente non hai eventos na galería. Volve pronto para poder ver os eventos. '}</p>
                  <button className='border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-2 hover:text-secondLightGray hover:bg-primaryGreen'>{language === 'es' ? 'VOLVER AL INICIO' : 'VOLVER AO COMEZO'}</button>
                </Link>
              </div>
            </div>
      }
    </main>
  );
};

export default dynamic(() => Promise.resolve(GalleryPage), { ssr: false }) ;
