"use client";

import {
  DashboardCardEvent,
  ModalEditEvents,
  ModalEvents,
} from "../../../../components";
import Loading from "../../../../components/loading/Loading";
import useGetAllEvents from "../../../../hooks/useGetAllEvents";
import Link from "next/link";
import { useLoginStore, useModalEventStore } from "../../../../store";
import { useRouter } from "next/navigation";
import ModalDeleteEvent from "../../../../components/dashboard/ModalEvents/ModalDeleteEvent";

const EventPage = () => {
  const token = useLoginStore((state) => state.token);

  const { events, loading, error, refetch } = useGetAllEvents();
  const openModal = useModalEventStore((state) => state.openModalEvent);

  const router = useRouter();

  if (!token) {
    router.push("/admin");
  }

  if (loading) return <Loading />;

  return (
    <section className="flex flex-col gap-2 mx-auto mb-4 lg:w-3/4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-primaryGreen text-2xl sm:text-4xl lg:text-5xl pt-4 pl-6 lg:pt-6 lg:pb-6 lg:pl-0">
          Eventos
        </h1>
        <button
          onClick={openModal}
          className=" mr-10 border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-3 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
        >
          NUEVO EVENTO
        </button>
      </div>
      <ModalEvents token={token} refetch={refetch} />
      <ModalDeleteEvent token={token} refetch={refetch} />
      <ModalEditEvents token={token} refetch={refetch} event={events} />
      {!loading && events.length > 0 ? (
        events.map((event) => {
          return (
            <DashboardCardEvent
              key={event.id}
              id={event.id}
              photo={event.event_photos[0]}
              title={event.title}
            />
          );
        })
      ) : (
        <>
          <div className="flex items-center gap-6 my-10 px-4 lg:my-0 lg:mt-28 lg:justify-center">
            <Image src={"/image/noEventsYet.svg"} width={150} height={150} />
            <div className="flex flex-col">
              <p>No hay eventos para mostrar</p>
            </div>
          </div>
          <Link href={"/admin/dashboard"} className="self-center">
            <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 hover:text-secondLightGray hover:bg-primaryGreen">
              VOLVER AL INICIO
            </button>
          </Link>
        </>
      )}
    </section>
  );
};

export default EventPage;
