"use client";

import { EventsCarousel, PersonsCarousel, CardEvent } from "../components";
import Image from "next/image";
import Calendar from "../components/ui/calendar";
import Link from "next/link";
import SelectInput from "../components/ui/selectInput";
import DateTimePickerValue from "../components/ui/dateRangePicker";
import useGetAllEvents from "../hooks/useGetAllEvents";
import useGetAllExperiences from "../hooks/useGetAllExperiences";
import Loading from "../components/loading/Loading";
import { useEffect, useState } from "react";
import { getAllEventsFilterService } from "../service";
import { useLanguageStore } from "../store/language/language.store";
import useGetAllSponsors from "../hooks/useGetAllSponsors";
import SponsorsCarrousel from "../components/sponsors/SponsorsCarrousel";
import useGetAllAchievements from "../hooks/useGetAllAchievements";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import useGetAllBanners from "../hooks/useGetAllBanners";
import Slider from "../components/homepageSlider/Slider";

export default function Home() {
  const { events, loading } = useGetAllEvents();
  const { banners } = useGetAllBanners();
  const { experiences } = useGetAllExperiences();
  const { sponsors } = useGetAllSponsors();
  const { achievements } = useGetAllAchievements();
  const [scroll, setScroll] = useState(false);
  const [typeEvent, setTypeEvent] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [eventDateStart, setEventDateStart] = useState();
  const [eventDateEnd, setEventDateEnd] = useState();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const language = useLanguageStore((state) => state.language);
  const categoryEvents = [];
  const locations = [];
  const { toast } = useToast();

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

  useEffect(() => {
    getAllEventsFilterService(
      typeEvent,
      locationEvent,
      eventDateStart,
      eventDateEnd
    )
      .catch((err) => {
        if (err.message !== 'Actualmente no hay ningún evento que cumpla con los parámetros seleccionados') {
        toast({
          variant: "destructive",
          title: err.message,
          className: "bg-secondRed text-white text-lg font-bold",
        });
        }
      })
      .then((res) => {
        setFilteredEvents(res);
      });
  }, [typeEvent, locationEvent, eventDateStart, eventDateEnd]);

  if (events.length > 0) {
    events.forEach((event) => {
      if (!categoryEvents.includes(event.event_type)) {
        categoryEvents.push(event.event_type);
      }

      if (!locations.includes(event.location)) {
        locations.push(event.location);
      }
    });
  }

  if (loading) return <Loading />;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
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
      {banners.length > 0 ? (
        <Slider banners={banners} />
      ) : (
        <div
          className="bg-[url('/image/eventos-M.jpg')] w-full bg-cover bg-center sm:bg-cover h-[380px] sm:h-[480px] bg-no-repeat flex sm:items-center justify-start"
          id="top"
        >
          <div className="ml-5 mt-5 sm:ml-32">
            <h1 className="font-bold text-3xl sm:text-6xl text-primaryGreen">
              A Coruña <span className="text-primaryGreen">en marcha</span>
              <br />
              <span className="text-primaryGreen">
                {language === "es" ? "CONTRA EL CÁNCER" : "CONTRA O CANCRO"}
              </span>
            </h1>
            <p className="text-xs sm:text-xl font-medium my-5 text-primaryGreen">
              {language === "es"
                ? "Consulta todos nuestros eventos solidarios e inscríbete"
                : "Consulta todos os nosos eventos solidarios e inscríbete"}
            </p>
            <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
              <Link href="/calendario-e-inscripciones">IR A EVENTOS</Link>
            </button>
          </div>
        </div>
      )}
      {language === "es" ? (
        <>
          <h3 className="text-2xl font-bold text-center mt-14 md:text-5xl lg:flex lg:pl-16 lg:w-full">
            ¿Qué es En Marcha?
          </h3>
          <section className="mb-16 px-7 mt-8 lg:w-full">
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              <span className="font-bold text-primaryGreen text-lg">
                A Coruña En Marcha
              </span>{" "}
              es el circuito de actividades deportivas 100% solidarias de la
              Asociación Española Contra el Cáncer en la provincia de A Coruña.
            </p>
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              El pasado año más de{" "}
              <span className="font-semibold">14.500 personas</span>{" "}
              participaron en nuestros{" "}
              <span className="font-semibold">26 eventos</span> con los que
              recaudamos <span className="font-semibold">297.000 euros</span>{" "}
              destinados a la investigación oncológica y al apoyo a pacientes y
              familias.
            </p>
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              Gracias a vuestra colaboración y solidaridad,{" "}
              <span className="font-bold text-primaryGreen text-lg">
                A Coruña
              </span>{" "}
              está en marcha contra el cáncer por la investigación, por los
              pacientes y por las familias. ¡Te esperamos!
            </p>
          </section>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-center mt-14 md:text-5xl lg:flex lg:pl-16 lg:w-full">
            ¿Que é En Marcha?
          </h3>
          <section className="mb-16 px-7 mt-8 lg:w-full">
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              <span className="font-bold text-primaryGreen text-lg">
                A Coruña En Marcha
              </span>{" "}
              é o circuíto de actividades deportivas 100% solidarias da
              Asociación Española Contra o Cancro na provincia da Coruña.
            </p>
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              O pasado ano máis de{" "}
              <span className="font-semibold">14.500 persoas</span> participaron
              nos nosos <span className="font-semibold">26 eventos</span> cos
              que recadamos <span className="font-semibold">297.000 euros</span>{" "}
              destinados á investigación oncolóxica e ao apoio a pacientes e
              familias.
            </p>
            <p className="pb-4 lg:w-[80%] lg:pl-16 text-justify">
              Grazas á vosa colaboración e solidaridade,{" "}
              <span className="font-bold text-primaryGreen text-lg">
                A Coruña
              </span>{" "}
              está en marcha contra o cancro pola investigación, polos pacientes
              e polas familias. Esperámoste!
            </p>
          </section>
        </>
      )}

      {events.length > 0 ? (
        <>
          <section className="bg-blueBgSection flex flex-col gap-4 px-7 pb-6 lg:pb-10 md:w-full max-md:landscape:w-full">
            <h2 className="text-lg font-extrabold text-center pt-6 pb-2">
              {language === "es"
                ? "Encuentra un evento en la provincia de A Coruña"
                : "Atopa un evento na provincia da Coruña"}
            </h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center">
              <div className="flex flex-col gap-6 md:justify-center md:flex-row md:items-center">
                <SelectInput
                  setStatus={setTypeEvent}
                  text={"Tipo de evento"}
                  eventType={"typeEvent"}
                  options={categoryEvents}
                  onChange={(e) => setTypeEvent(e.target.value)}
                ></SelectInput>
                <SelectInput
                  setStatus={setLocationEvent}
                  text={"Localidades"}
                  eventType={"locationEvent"}
                  options={locations}
                  onChange={(e) => setLocationEvent(e.target.value)}
                ></SelectInput>
              </div>
              <DateTimePickerValue
                language={language}
                eventDateEnd={eventDateEnd}
                setEventDateEnd={setEventDateEnd}
                setEventDateStart={setEventDateStart}
                eventDateStart={eventDateStart}
              ></DateTimePickerValue>
            </div>
          </section>
          <h3 className="text-2xl font-bold mt-8 mb-2 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-20">
            Próximos eventos
          </h3>
          <h4 className="font-bold mb-8 text-2xl lg:flex lg:pl-20 lg:w-full lg:gap-2">
            {language === "es" ? (
              <p>
                en la provincia de{" "}
                <span className="text-primaryGreen">A Coruña</span>
              </p>
            ) : (
              <p>
                na provincia da{" "}
                <span className="text-primaryGreen">Coruña</span>
              </p>
            )}
          </h4>
          {filteredEvents && filteredEvents.length > 3 ? (
            <EventsCarousel filteredEvents={filteredEvents} />
          ) : (
            <div className="flex flex-col gap-10 mb-6 mt-4 lg:flex-row lg:flex-wrap">
              {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <CardEvent
                    title={event.title}
                    key={event.id}
                    image={event.event_photos ? event.event_photos[0] : false}
                    description={
                      language === "es" ? event.content : event.galician_content
                    }
                    location={event.location}
                    link={event.link}
                    date={event.date_start}
                    warning={event.warning}
                  />
                ))
              ) : (
                <EventsCarousel />
              )}
            </div>
          )}
          <section className="flex flex-col w-full md:items-center lg:items-start pl-8 pr-8 lg:relative">
            <div className="flex flex-col items-center w-full lg:flex lg:flex-wrap lg:items-start">
              <h2 className="text-2xl font-bold my-8 mb-10 md:text-5xl lg:flex lg:pl-12 lg:w-full lg:mt-20">
                Calendario de eventos
              </h2>
              <p className="mb-8 mr-5 ml-5 text-balance md:text-center lg:text-left lg:text.left lg:w-2/6 lg:ml-10 max-md:landscape:text-center">
                {language === "es"
                  ? "Consulta todos los eventos solidarios En Marcha que tenemos planificados. Consulta nuestro calendario."
                  : "Consulta todos os eventos solidarios En Marcha que temos planificados. Consulta o noso calendario."}
                <br />{" "}
                {language === "es" ? "¡Te estamos esperando!" : "Esperámoste!"}
              </p>
              <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-8 lg:self-start lg:ml-10 hover:text-secondLightGray hover:bg-primaryGreen">
                <Link href="/calendario-e-inscripciones">
                  {language === "es"
                    ? "VER TODOS LOS EVENTOS"
                    : "VER TODOS OS EVENTOS"}
                </Link>
              </button>
            </div>
            <div className="flex justify-center lg:absolute lg:top-[100px] lg:right-[30%] max-xl:landscape:right-4">
              <Calendar />
            </div>
          </section>
        </>
      ) : (
        <div className="flex items-center gap-6 px-4 flex-col lg:flex-row">
          <Image
            src={"/image/noEventsYet.svg"}
            width={150}
            height={150}
            alt="Todavía no hay eventos"
          />
          <div className="flex flex-col">
            <p>
              {language === "es"
                ? "Estamos trabajando en nuevos eventos solidarios contra el cáncer. "
                : "Estamos a traballar en novos eventos solidarios contra o cancro."}
              .
            </p>
            <p>
              {language === "es"
                ? "Vuelve pronto y únete a la causa."
                : "Volve pronto e únete á causa."}{" "}
              <span className="font-bold">#EnMarchaContraElCáncer</span>
            </p>
          </div>
        </div>
      )}
            <h3 className="text-2xl font-bold my-10 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-40">
              {language === "es" ? "En primera persona" : "En primeira persoa"}
            </h3>
            {experiences.length > 0 ? (
              <div className="flex lg:justify-center justify-start mb-16 w-[75%] max-md:landscape:w-full">
                <PersonsCarousel />
              </div>
            ) : (
              <div className="flex items-center gap-6 px-4 mb-8 md:w-[708px] lg:mb-24 lg:mt-12">
                <Image
                  src={"/image/noExperiencesYet.svg"}
                  height={150}
                  width={150}
                  alt="Todavía no hay experiencias"
                />
                <div className="flex flex-col">
                  <p className="text-balance">
                    {language === "es"
                      ? "Comparte tu experiencia en nuestros eventos solidarios. ¡Gracias por tu apoyo!"
                      : "Comparte a túa experiencia nos nosos eventos solidarios. Grazas polo teu apoio!"}
                  </p>
                </div>
              </div>
            )}
      {achievements && achievements.length > 0 ? (
        <>
          <h3 className="text-2xl font-bold mt-8 mb-10 md:text-5xl md:mb-14 lg:flex lg:pl-20 lg:w-full lg:mb-14">
            {language === "es"
              ? "Gracias a tu participación"
              : "Grazas á túa participación"}
          </h3>
          <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-3 container">
            {achievements.map((achievement) => {
              const imgSrc =
              process.env.NEXT_PUBLIC_BACK_URL +
              `/uploads/${achievement.icon}`;
              return (
                <div
                className="flex flex-col items-center gap-5 h-full"
                key={achievement.id}
                >
                  <div className="w-[120px] h-[120px] object-contain border-2 p-6 border-primaryGreen rounded-full flex items-center">
                    <Image
                      src={imgSrc}
                      width={120}
                      height={120}
                      className="object-contain w-[120px] h-[120px]"
                      alt="Icono"
                      />
                  </div>
                  <p className="text-sm mx-5">
                    {language === "es"
                      ? achievement.description
                      : achievement.galician_description}
                  </p>
                </div>
              );
            })}
          </div>
        </>
        ) : null}
        {sponsors && sponsors.length > 0 ? (
          <>
            <h3 className="text-2xl font-bold mb-8 mt-12 md:text-5xl md:mb-14 lg:flex lg:pl-20 lg:w-full lg:mt-20">
              {language === "es"
                ? "Nuestros patrocinadores"
                : "Os nosos patrocinadores"}
            </h3>
            <section className="mb-14">
              <SponsorsCarrousel />
            </section>
          </>
        ) : null}
      </main>
      <Toaster />
    </>
  );
}
