"use client";

import Image from "next/image";
import Link from "next/link";
import useGetAllNews from "../../hooks/useGetAllNews";
import useGetAllEvents from "../../hooks/useGetAllEvents";
import Loading from "../../components/loading/Loading";
import { useLanguageStore } from "../../store/language/language.store";
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';

const Noticias = () => {
  const { news, loading, error } = useGetAllNews();
  const { events, loading: lodingEvents } = useGetAllEvents();
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

  const eventsFilter = events
    .filter(
      (event) => event.warning === 1 && new Date(event.date_end) > new Date()
    )
    .map((event) => {
      return (
        <article
          key={event.id}
          className="flex flex-col justify-between p-8 items-center shadow-md gap-10 lg:flex-row"
        >
          <h3 className="font-bold px-6">
            {language === "es" ? event.title : event.galician_title}
          </h3>
          <p>
            {language === "es"
              ? event.warning_content
              : event.galician_warning_content}
          </p>
          <Link href={event.link} target="_blank">
            <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-4 mb-4 hover:text-secondLightGray hover:bg-primaryGreen min-w-44">
              VER EVENTO
            </button>
          </Link>
        </article>
      );
    });

  if (loading || lodingEvents) return <Loading />;

  return (
    <main className="flex flex-col gap-2 mx-auto mb-4 lg:w-3/4" id='top'>
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
      {eventsFilter.length > 0 ? (
        <>
          <h2 className="font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0">
            {language === "es" ? "Avisos especiales" : "Avisos especiais"}
          </h2>
          {eventsFilter}
        </>
      ) : null}
      <h1 className="font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0">
        Noticias
      </h1>
      {news.length > 0 ? (
        news.sort((a, b) => new Date(b.news_date ? b.news_date : b.create_date) - new Date(a.news_date ? a.news_date : a.create_date)).map((newItem) => {
          const imgSrc =
            process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${newItem.photo}`;
          return (
            <Link href={`${newItem.link}`} target="_blank" key={newItem.id}>
              <article className="flex justify-between p-8 items-center shadow-md">
                <div className="flex items-center">
                  <p className="w-[52px] lg:w-28 text-center flex items-center text-primaryGreen font-bold">
                    {new Date(newItem.news_date || newItem.create_date)
                      .toLocaleDateString("es-ES", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .toLocaleUpperCase()}
                  </p>
                  <h2 className="font-bold px-6">
                    {language === "es" ? newItem.title : newItem.galician_title}
                  </h2>
                </div>
                {newItem.photo !== null ? (
                  <div className="self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]">
                    <Image
                      src={imgSrc}
                      width={150}
                      height={72}
                      alt="Imagen de la noticia"
                      className="lg:max-w-[150px] lg:max-h-[72px] object-cover"
                    />
                  </div>
                ) : (
                  <div className="self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]">
                    <Image
                      src={"/image/newsDefault.png"}
                      width={150}
                      height={72}
                      alt="Imagen de la noticia"
                      className="lg:max-w-[150px] lg:max-h-[72px] object-cover"
                    />
                  </div>
                )}
              </article>
            </Link>
          );
        })
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
            <Image
              src={"/image/noNewsYet.svg"}
              width={300}
              height={300}
              alt="Noticias"
            />
            <p className="mt-2 md:text-center">
              {language === "es"
                ? "Aún no hay noticias. Vuelve pronto para estar al corriente de todas las novedades."
                : "Aínda non hai noticias. Volve pronto para estar ao corrente de tódalas novidades."}
            </p>
          </div>
          <Link href={"/"} className="self-center">
            <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-4 mb-4 hover:text-secondLightGray hover:bg-primaryGreen">
              {language === "es" ? "VOLVER AL INICIO" : "VOLVER Ó COMEZO"}
            </button>
          </Link>
        </>
      )}
    </main>
  );
};

export default dynamic(() => Promise.resolve(Noticias), { ssr: false });
