"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DashboardCardEvent,
  ModalEditEvents,
  ModalEvents,
} from "../../../../components";
import Loading from "../../../../components/loading/Loading";
import useGetAllEvents from "../../../../hooks/useGetAllEvents";
import { useLoginStore, useModalEventStore } from "../../../../store";
import BlockScroll from "../../../../components/blockScroll/BlockScroll";
import ModalDeleteEvent from "../../../../components/modals/events/ModalDeleteEvent";

const EventPage = () => {
  const token = useLoginStore((state) => state.token);
  const absolutely = true;
  const { events, loading, error, refetch, setEvents } =
    useGetAllEvents(absolutely);
  const openModal = useModalEventStore((state) => state.openModalEvent);
  const isEditModalOpen = useModalEventStore(
    (state) => state.isModalEditEventOpen
  );
  const isDeleteModalOpen = useModalEventStore(
    (state) => state.isModalDeleteEventOpen
  );
  const isAddModalEventOpen = useModalEventStore(
    (state) => state.isModalEventOpen
  );

  const router = useRouter();

  if (!token) {
    router.push("/admin");
  }

  if (loading) return <Loading />;

  return (
    <main>
      <section className="flex flex-col my-4 px-4 items-center">
        <BlockScroll
          isModalOpen={
            isEditModalOpen || isDeleteModalOpen || isAddModalEventOpen
          }
        />
        <button
          onClick={openModal}
          className=" border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
          mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
        >
          NUEVO EVENTO
        </button>
        {!loading && events.length > 0 ? (
          events
            .sort((a, b) => new Date(b.date_start) - new Date(a.date_start))
            .map((event) => {
              return (
                <DashboardCardEvent
                  key={event.id}
                  id={event.id}
                  photo={event.event_photos ? event.event_photos[0] : false}
                  title={event.title}
                  warning={event.warning}
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
              <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 hover:text-secondLightGray hover:bg-primaryGreen mt-6">
                VOLVER AL INICIO
              </button>
            </Link>
          </>
        )}
      </section>
      <ModalEvents token={token} refetch={refetch} />
      <ModalDeleteEvent token={token} refetch={refetch} setEvents={setEvents} />
      <ModalEditEvents token={token} refetch={refetch} event={events} />
    </main>
  );
};

export default EventPage;
