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
import useGetAllSponsors from '../hooks/useGetAllSponsors';
import SponsorsCarrousel from '../components/sponsors/SponsorsCarrousel';

export default function Home() {
  const { events, loading } = useGetAllEvents();
  const { experiences } = useGetAllExperiences();
  const { sponsors } = useGetAllSponsors();
  const [scroll, setScroll] = useState(false);
  const [typeEvent, setTypeEvent] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [eventDateStart, setEventDateStart] = useState();
  const [eventDateEnd, setEventDateEnd] = useState();
  const [eventsFiltered, setEventsFiltered] = useState(events);
  const language = useLanguageStore((state) => state.language);
  const categoryEvents = [];
  const locations = [];

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await getAllEventsFilterService(
        typeEvent,
        locationEvent,
        eventDateStart,
        eventDateEnd
      );
      setEventsFiltered(data);
    } catch (err) {
      console.error(err.message);
    }
  }

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
      <div
        className="bg-[url('/image/eventos-M.jpg')] w-full bg-cover bg-center sm:bg-cover h-[380px] sm:h-[480px] bg-no-repeat flex sm:items-center justify-start"
        id="top"
      >
        <div className="ml-5 mt-5 sm:ml-32">
          <h1 className="font-bold text-3xl sm:text-6xl text-white">
            A Coruña <span className="text-primaryGreen">en marcha</span>
            <br />
            <span className="text-primaryGreen">
              CONTRA O CANCRO
            </span>
          </h1>
          <p className="text-xs sm:text-xl font-medium my-5 text-white">
            {language === "es"
              ? "CONSULTA TODOS NUESTROS EVENTOS E INSCRÍBETE"
              : "CONSULTA TODOS OS NOSOS EVENTOS E INSCRÍBETE"}
          </p>
          <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
            <Link href="/calendario-e-inscripciones">IR A EVENTOS</Link>
          </button>
        </div>
      </div>
      {
        language === 'es'
          ? <>
              <h3 className="text-2xl font-bold text-center mt-14 md:text-5xl lg:flex lg:pl-16 lg:w-full">¿Qué es En Marcha?</h3>
              <section className='mb-16 px-7 mt-8'>
                <p className='pb-4 lg:w-[80%] lg:pl-16'>
                  <span className='font-bold text-primaryGreen text-lg'>En Marcha</span> es un movimiento que reúne a miles de personas de toda España en torno a una causa común: la lucha contra el cáncer. Un ejemplo de colaboración 
                  público-privada que se ha convertido en una cita imprescindible, en la que personas de todas las edades y condiciones se mueven por un futuro sin cáncer.
                </p>
                <p className='pb-4 lg:w-[80%] lg:pl-16'>
                  El deporte siempre se ha caracterizado por ponerse al servicio de las más diversas causas solidarias. En el caso de las carreras populares, la travesía a nado 
                  o el pádel, el componente competitivo queda en un segundo plano para la gran mayoría de los participantes en favor del simple placer de realizar una actividad física en un ambiente festivo.
                </p>
                <p className='pb-4 lg:w-[80%] lg:pl-16'>
                  Los participantes de los eventos <span className='font-bold text-primaryGreen text-lg'>En Marcha</span> no solo colaboran en la lucha contra el cáncer, sino que también cuidan de su salud porque moverse 
                  importa y más cuando se hace en compañía  y por una buena causa.
                </p>
              </section>
            </>
          : <>
              <h3 className="text-2xl font-bold text-center mt-14 md:text-5xl lg:flex lg:pl-16 lg:w-full">¿Que é En Marcha?</h3>
              <section className='mb-16 px-7 mt-8'>
                <p className='pb-4 lg:w-[80%] lg:pl-16 text-balance'>
                  <span className='font-bold text-primaryGreen text-lg'>En Marcha</span> é un movemento que reúne a miles de persoas de toda España arredor dunha causa común: a loita contra o cancro. Un exemplo de colaboración
                  público-privado que se converteu nun evento imprescindible, no que persoas de todas as idades e condicións avanzan cara a un futuro sen cancro.
                </p>
                <p className='pb-4 lg:w-[80%] lg:pl-16 text-balance'>
                  O deporte sempre se caracterizou por poñerse ao servizo das máis diversas causas solidarias. No caso das carreiras populares, a travesía a natación
                  ou pádel, a compoñente competitiva pasa a un segundo plano para a gran maioría dos participantes en favor do simple pracer de realizar unha actividade física nun ambiente festivo.
                </p>
                <p className='pb-4 lg:w-[80%] lg:pl-16 text-balance'>
                  Os participantes dos eventos <span className='font-bold text-primaryGreen text-lg'>En Marcha</span> non só colaboran na loita contra o cancro, senón que coidan a súa saúde porque o movemento
                  importa e máis aínda cando se fai en compañía e por unha boa causa.
                </p>
              </section>
            </>
      }
      
      {events.length > 0 ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-blueBgSection flex flex-col gap-4 px-7 lg:pb-10 md:w-full lg:h-80 lg:justify-center"
          >
            <h2 className="text-lg font-extrabold text-center pt-6 pb-2">
              {language === "es"
                ? "Encuentra un evento #contraelcáncer"
                : "Atopa un evento #contraelcáncer"}
            </h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <SelectInput
                  setStatus={setTypeEvent}
                  text={"Tipo de evento"}
                  eventType={"typeEvent"}
                  options={categoryEvents}
                ></SelectInput>
                <SelectInput
                  setStatus={setLocationEvent}
                  text={"Localidades"}
                  eventType={"locationEvent"}
                  options={locations}
                ></SelectInput>
              </div>
              <DateTimePickerValue
                eventDateEnd={eventDateEnd}
                setEventDateEnd={setEventDateEnd}
                setEventDateStart={setEventDateStart}
                eventDateStart={eventDateStart}
                language={language}
              ></DateTimePickerValue>
              <button
                type="submit"
                className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
              >
                BUSCAR
              </button>
            </div>
          </form>
          <h3 className="text-2xl font-bold my-8 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-20">
            Próximos eventos
          </h3>
          {eventsFiltered && eventsFiltered.length >= 3 ? (
            <EventsCarousel />
            ) : (
              <div className="flex flex-col gap-10 mb-6 mt-4 lg:flex-row lg:flex-wrap">
              {eventsFiltered && eventsFiltered.length > 0
                ? eventsFiltered.map((event) => (
                    <CardEvent
                      title={event.title}
                      key={event.id}
                      image={event.event_photos[0]}
                      description={event.content}
                      location={event.location}
                      link={event.link}
                      warning={event.warning}
                      />
                      ))
                      : 
                      <EventsCarousel />
                  //     events.slice(0, 4).map((event) => (
                  //       <CardEvent
                  //     title={
                  //       language === "es" ? event.title : event.galician_title
                  //     }
                  //     image={event.event_photos[0]}
                  //     key={event.id}
                  //     description={
                  //       language === "es"
                  //         ? event.content
                  //         : event.galician_content
                  //     }
                  //     location={event.location}
                  //     link={event.link}
                  //     warning={event.warning}
                  //   />
                  // )
                  // )
                  }
            </div>
          )}
          <section className="flex flex-col w-full md:items-center lg:items-start pl-8 pr-8 lg:relative">
            <div className="flex flex-col items-center w-full lg:flex lg:flex-wrap lg:items-start">
              <h2 className="text-2xl font-bold my-8 mb-10 md:text-5xl lg:flex lg:pl-12 lg:w-full lg:mt-20">
                Calendario de eventos
              </h2>
              <p className="mb-8 mr-5 ml-5 text-balance md:text-center lg:text-left lg:text.left lg:w-2/6 lg:ml-10">
                {language === "es"
                  ? "Consulta todos los eventos que hemos planificado este año. Desplázate por el calendario y no te pierdas ninguno."
                  : "Consulta todos os eventos que temos planificados para este ano. Desplázate polo calendario e non perdas ningún"}
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
            <div className="flex justify-center lg:absolute lg:top-[100px] lg:right-80 2xl:right-[40rem]">
              <Calendar />
            </div>
          </section>
        </>
      ) : (
        <div className="flex items-center gap-6 my-10 px-4 lg:my-0 lg:mt-28">
          <Image
            src={"/image/noEventsYet.svg"}
            width={150}
            height={150}
            alt="Todavía no hay eventos"
          />
          <div className="flex flex-col">
            <p>
              {language === "es"
                ? "Estamos trabajando en nuevos eventos para luchar contra el cáncer."
                : "Estamos traballando en novos eventos para a loita contra o cancro."}
              .
            </p>
            <p>
              {language === "es"
                ? "Vuelve pronto y únete a la causa."
                : "Volve pronto e únete á causa."}{" "}
              <span className="font-bold">#JuntosContraElCáncer</span>
            </p>
          </div>
        </div>
      )}
      {
        sponsors
          ? <>
              <h3 className="text-2xl font-bold my-8 md:text-5xl md:mb-14 lg:flex lg:pl-20 lg:w-full lg:mt-20">
                Nuestros patrocinadores
              </h3>
              <section className='md:mb-14'>
                <SponsorsCarrousel/>
              </section>
            </>
          : null
      }
      <h3 className="text-2xl font-bold my-8 mb-10 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mb-14">
        {language === "es"
          ? "Gracias a tu participación..."
          : "Gracias á túa participación..."}
      </h3>
      <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-3 container">
        <div className="flex flex-col items-center gap-5">
          <div className="w-[120px] h-[120px]">
            <Image
              src="/image/Recaudacion@2x_2.png"
              width={120}
              height={120}
              className="border-2 p-6 border-primaryGreen rounded-full object-contain w-[120px] h-[120px]"
              alt="Recaudacion"
            />
          </div>
          <p className="text-sm mx-5">
            {language === "es"
              ? "Haces posible que sigamos ofreciendo servicios gratuitos a pacientes de cáncer."
              : "Fas posible que sigamos ofrecendo servizos gratuítos a pacientes de cancro."}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-[120px] h-[120px]">
            <Image
              src="/image/Recaudacion@2x_2.png"
              width={120}
              height={120}
              className="border-2 p-6 border-primaryGreen rounded-full object-contain w-[120px] h-[120px]"
              alt="Recaudacion"
            />
          </div>
          <p className="text-sm mx-5">
            {language === "es"
              ? "Contribuyes a reducir el impacto del cáncer en personas en riesgo de exclusión social."
              : "Contribúes a reducir o impacto do cancro en persoas en risco de exclusión social."}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-[120px] h-[120px]">
            <Image
              src="/image/Participantes@2x_2.png"
              width={120}
              height={120}
              className="border-2 p-6 border-primaryGreen rounded-full object-contain w-[120px] h-[120px]"
              alt="Participantes"
            />
          </div>
          <p className="text-sm mx-5">
            {language === "es"
              ? "Ayudas a más de XXX pacientes de cáncer y sus familiares durante el tratamiento oncológico."
              : "Axudas a máis de XXX pacientes de cancro e os seus familiares durante o tratamento oncolóxico."}
          </p>
        </div>
      </div>
      <h3 className="text-2xl font-bold my-10 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-20">
        {language === "es" ? "En primera persona" : "En primeira persoa"}
      </h3>
      {experiences.length > 0 ? (
        <div className="flex lg:justify-center sm:justify-start sm:mb-16 w-[75%]">
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
                ? "Únete a la Asociación Contra el Cáncer compartiendo tu experiencia en nuestros eventos solidarios."
                : "Únete á Asociación Contra o Cancro compartindo a túa experiencia nos nosos eventos solidarios."}
            </p>
            <span className="font-bold">#CadaHistoriaCuenta.</span>
          </div>
        </div>
      )}
    </main>
  );
}
