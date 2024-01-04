"use client";

import { initialEvents } from "@/mockup/events";
import { EventsCarousel, PersonsCarousel } from "../components";
import Image from "next/image";
import { users } from "@/lib/users";

const events = initialEvents;

export default function Home() {
  const carouselUsers = users;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:gap-10">
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
          <button className="bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5">
            IR A EVENTOS
          </button>
        </div>
      </div>
      <div className="flex sm:w-full sm:ml-32">
        <h3 className="text-2xl sm:text-5xl font-bold my-8 ml-2 sm:mb-10">
          Próximos eventos
        </h3>
      </div>
      <div className="flex flex-col justify-center gap-5 text-black">
        <EventsCarousel />
        <div className="mt-10 flex justify-center">
          <button className="border border-primaryGreen rounded-2xl text-sm font-bold px-10 py-2">
            VER TODOS
          </button>
        </div>
      </div>
      <div className="flex sm:w-full sm:ml-32 mt-10">
        <h3 className="text-2xl sm:text-5xl font-bold my-8 ml-2 sm:mb-10">
          Gracias a tu participación...
        </h3>
      </div>
      <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-3 container">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/image/Recaudacion@2x_2.png"
            width={120}
            height={120}
            className="border-2 p-6 border-primaryGreen rounded-full"
          />
          <p className="text-sm mx-5">
            Haces posible que sigamos ofreciendo servicios gratuitos a pacientes
            de cáncer.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/image/Recaudacion@2x_2.png"
            width={120}
            height={120}
            className="border-2 p-6 border-primaryGreen rounded-full"
          />
          <p className="text-sm mx-5">
            Contribuyes a reducir el impacto del cáncer en personas en riesgo de
            exclusión social.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/image/Participantes@2x_2.png"
            width={130}
            height={130}
            className="border-2 p-6 border-primaryGreen rounded-full"
          />
          <p className="text-sm mx-5">
            Ayudas a más de XXX pacientes de cáncer y sus familiares durante el
            tratamiento oncológico.
          </p>
        </div>
      </div>
      <div className="flex sm:w-full sm:ml-32 mt-10">
        <h3 className="text-2xl sm:text-5xl font-bold my-8 ml-2 sm:mb-10">
          En primera persona
        </h3>
      </div>
      <div className="flex justify-center sm:justify-start">
        <PersonsCarousel users={carouselUsers} />
      </div>
    </main>
  );
}
