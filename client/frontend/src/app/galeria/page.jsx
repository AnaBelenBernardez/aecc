"use client"

import { GalleryCard } from "../../components";
import useGetAllEvents from '../../hooks/useGetAllEvents';
import Loading from '../../components/loading/Loading';
import Link from 'next/link';
import Image from 'next/image';
import {useLanguageStore} from '../../store/language/language.store';
import dynamic from 'next/dynamic';


const GalleryPage = () => {
  const { events, loading, error } = useGetAllEvents();

  const language = useLanguageStore((state) => state.language);
  if (loading) return <Loading/>;

  return (
    <main className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap my-4 lg:mx-10 lg:my-8">
      {
        events.length > 0 
          ? events.map((event) => {
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
                  <p className='md:w-3/4 md:mb-4'>{language === 'es' ? 'Actualmente, no hay eventos en la galería. ¡Estamos preparando nuevas oportunidades solidarias!' : 'Actualmente, non hai eventos na galería. Estamos a preparar novas oportunidades solidarias!'}</p>
                  <button className='border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-2 hover:text-secondLightGray hover:bg-primaryGreen'>{language === 'es' ? 'VOLVER AL INICIO' : 'VOLVER AO COMEZO'}</button>
                </Link>
              </div>
            </div>
      }
    </main>
  );
};

export default dynamic(() => Promise.resolve(GalleryPage), { ssr: false }) ;
