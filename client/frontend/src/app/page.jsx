"use client";

import { EventsCarousel, PersonsCarousel } from "../components";
import Image from "next/image";
import { users } from "@/lib/users";
import Calendar from "../components/ui/calendar";
import Link from "next/link";
import SelectInput from "../components/ui/selectInput";
import DateTimePickerValue from "../components/ui/dateRangePicker";
import useGetAllEvents from "../hooks/useGetAllEvents";

export default function Home() {
  const { events, loading, error } = useGetAllEvents();
  const carouselUsers = users;
  const categoryEvents = [];
  const locations = [];

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-[url('/image/eventos-M.webp')] w-full bg-cover bg-center sm:bg-cover h-[380px] sm:h-[480px] bg-no-repeat flex sm:items-center justify-start">
        <div className="ml-5 mt-5 sm:ml-32">
          <h1 className="font-bold text-3xl sm:text-6xl text-white">
            A Coruña <span className="text-primaryGreen">en marcha</span>
            <br />
            <span className="text-primaryGreen"> contra el cáncer</span>
          </h1>
          <p className="text-xs sm:text-xl font-medium my-5 text-white">
            CONSULTA TODOS NUESTROS EVENTOS E INSCRÍBETE
          </p>
          <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
            <Link href="/calendario-e-inscripciones">IR A EVENTOS</Link>
          </button>
        </div>
      </div>
      {events.length > 0 ? (
        <>
          <section className="bg-blueBgSection flex flex-col gap-4 px-7 lg:pb-10 md:w-full lg:h-80 lg:justify-center">
            <h2 className="text-lg font-extrabold text-center pt-6 pb-2">
              Encuentra un evento #contraelcáncer
            </h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <SelectInput
                  text={"Tipo de evento"}
                  eventType={"events"}
                  options={categoryEvents}
                ></SelectInput>
                <SelectInput
                  text={"Localidades"}
                  eventType={"locations"}
                  options={locations}
                ></SelectInput>
              </div>
              <DateTimePickerValue></DateTimePickerValue>
              <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">
                Buscar
              </button>
            </div>
          </section>
          <h3 className="text-2xl font-bold my-8 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-20">
            Próximos eventos
          </h3>
          <div>
            <EventsCarousel />
            <div className="mt-4 flex justify-center">
              <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 hover:text-secondLightGray hover:bg-primaryGreen">
                <Link href="/calendario-e-inscripciones">VER TODOS</Link>
              </button>
            </div>
          </div>
          <section className="flex flex-col w-full md:items-center lg:items-start pl-8 pr-8 lg:relative">
            <div className="flex flex-col items-center w-full lg:flex lg:flex-wrap lg:items-start">
              <h2 className="text-2xl font-bold my-8 mb-10 md:text-5xl lg:flex lg:pl-12 lg:w-full lg:mt-20">
                Calendario de eventos
              </h2>
              <p className="mb-8 mr-5 ml-5 text-balance md:text-center lg:text-left lg:text.left lg:w-2/6 lg:ml-10">
                Consulta todos los eventos que hemos planificado este año.
                Desplázate por el calendario y no te pierdas ninguno. <br />
                Te estamos esperando.
              </p>
              <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-8 lg:self-start lg:ml-10 hover:text-secondLightGray hover:bg-primaryGreen">
                <Link href="/calendario-e-inscripciones">
                  VER TODOS LOS EVENTOS
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
          <Image src={"/image/noEventsYet.svg"} width={150} height={150} />
          <div className="flex flex-col">
            <p>
              Estamos trabajando en nuevos eventos para luchar contra el cáncer.
            </p>
            <p>
              Vuelve pronto y únete a la causa.{" "}
              <span className="font-bold">#JuntosContraElCáncer</span>
            </p>
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold my-8 mb-10 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-32 lg:mb-14">
        Gracias a tu participación...
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
            Haces posible que sigamos ofreciendo servicios gratuitos a pacientes
            de cáncer.
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
            Contribuyes a reducir el impacto del cáncer en personas en riesgo de
            exclusión social.
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
            Ayudas a más de XXX pacientes de cáncer y sus familiares durante el
            tratamiento oncológico.
          </p>
        </div>
      </div>
      <h3 className="text-2xl font-bold my-10 md:text-5xl lg:flex lg:pl-20 lg:w-full lg:mt-20">
        En primera persona
      </h3>
      <div className="flex justify-center sm:justify-start sm:mb-16">
        <PersonsCarousel users={carouselUsers} />
      </div>
    </main>
  );
}
