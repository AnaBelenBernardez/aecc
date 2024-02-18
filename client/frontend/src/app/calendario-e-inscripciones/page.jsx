"use client";

import SelectInput from "../../components/ui/selectInput";
import DateTimePickerValue from "../../components/ui/dateRangePicker";
import { CardEvent } from "../../components/events/CardEvent/CardEvent";
import useGetAllEvents from "../../hooks/useGetAllEvents";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";
import { getAllEventsFilterService } from "../../service";
import { useLanguageStore } from "../../store/language/language.store";
import { useToast } from '../../components/ui/use-toast';
import { Toaster } from '../../components/ui/toaster';

export default function CalendarAndRegistration() {
  const { events, loading, error } = useGetAllEvents();
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

      getAllEventsFilterService(
        typeEvent,
        locationEvent,
        eventDateStart,
        eventDateEnd
      ).catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
          className: "bg-secondRed text-white text-lg font-bold"
        })
      }).then((res) => {
        setFilteredEvents(res);
      });
  }, [typeEvent, locationEvent, eventDateStart, eventDateEnd]);

  events.forEach((event) => {
    if (!categoryEvents.includes(event.event_type)) {
      categoryEvents.push(event.event_type);
    }

    if (!locations.includes(event.location)) {
      locations.push(event.location);
    }
  });

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col">
      <section className="bg-blueBgSection flex flex-col gap-4 px-7 pb-6 lg:pb-10">
        <h2 className="text-lg font-extrabold text-center pt-6 pb-2">
          {language === "es"
            ? "Encuentra un evento #contraelcáncer en la provincia de A Coruña"
            : "Atopa un evento #contraocancro na provincia de A Coruña"}
        </h2>
        <div className="flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
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
      {events.length > 0 ? (
        <section className="mb-8 mx-8">
          <h2 className="text-2xl font-bold text-center mb-9 mt-9 sm:text-5xl sm:text-left sm:ml-10">
            Próximos eventos
          </h2>
          <ul className="flex flex-wrap gap-10 justify-center md:gap-4 lg:gap-10">
            {loading ? (
              <Loading />
            ) : (
              filteredEvents &&
              filteredEvents.map((event) => {
                return (
                  <li key={event.id}>
                    <CardEvent
                      title={
                        language === "es" ? event.title : event.galician_title
                      }
                      image={event.event_photos[0]}
                      description={
                        language === "es"
                          ? event.content
                          : event.galician_content
                      }
                      location={event.location}
                      link={event.link}
                      warning={event.warning}
                    ></CardEvent>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      ) : (
        <>
          <div className="flex items-center gap-6 my-10 px-4 lg:my-0 lg:mt-28 lg:justify-center">
            <Image src={"/image/noEventsYet.svg"} width={150} height={150} alt='No hay eventos todavía' />
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
          <Link href={"/"} className="self-center">
            <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 hover:text-secondLightGray hover:bg-primaryGreen">
              {language === "es" ? "VOLVER AL INICIO" : "VOLVER AO COMEZO"}
            </button>
          </Link>
        </>
      )}
      <Toaster />
    </main>
  );
}
