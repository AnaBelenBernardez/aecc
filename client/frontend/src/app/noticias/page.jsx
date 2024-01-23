"use client"

import Image from 'next/image';
import Link from 'next/link';
import useGetAllNews from '../../hooks/useGetAllNews';
import useGetAllEvents from '../../hooks/useGetAllEvents';

const Noticias = () => {
  const { news, loading, error } = useGetAllNews();
  const { events } = useGetAllEvents();

  console.log(events);
  const eventsFilter = events.filter((event) => event.warning === 1).map((event) => {
    return (
      <article key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.warning_content}</p>
        <Link href={event.link} target='_blank'>
          <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-4 mb-4 hover:text-secondLightGray hover:bg-primaryGreen">VER EVENTO</button>
        </Link>
      </article>
    )
  });

  return (
    <main className='flex flex-col gap-2 mx-auto mb-4'>
      {
        eventsFilter.length > 0
          ? <>
              <h2 className='font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0'>Avisos especiales</h2>
              {eventsFilter}
            </>
          : null
      }
      <h1 className='font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0'>Noticias</h1>
      {
        news.length > 0 
          ? news.map((newItem) => {
            const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${newItem.photo}`;
              return (
                <Link href={`${newItem.link}`} target='_blank' key={newItem.id}>
                  <article className='flex justify-between p-8 items-center shadow-md'>
                    <div className='flex items-center'>
                      <p className='w-[52px] text-center flex items-center text-lightPink font-bold'>{new Date(newItem.news_date || newItem.create_date).toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' }).toLocaleUpperCase()}</p>
                      <h2 className='font-bold px-6'>{newItem.title}</h2>
                    </div>
                    {
                      newItem.photo !== null
                        ? <div className='self-center hidden lg:block'>
                            <Image src={imgSrc} width={150} height={150} alt='Imagen de la noticia'/>
                          </div>
                        : <div className='self-center hidden lg:block'>
                            <Image src={'/image/newsDefault.png'} width={150} height={150} alt='Imagen de la noticia'/>
                          </div>
                    }
                  </article>
                </Link>
              )
            })
          : <>
              <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
                <Image src={'/image/noNewsYet.svg'} width={300} height={300} alt='Noticias'/>
                <p className='mt-2 font-bold md:text-center'>Todavía no hay noticias</p>
              </div>
              <Link href={'/'} className='self-center'>
                <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-4 mb-4 hover:text-secondLightGray hover:bg-primaryGreen">
                  VOLVER AL INICIO
                </button>
              </Link>
            </>
      }
    </main>
  )
};  

export default Noticias;