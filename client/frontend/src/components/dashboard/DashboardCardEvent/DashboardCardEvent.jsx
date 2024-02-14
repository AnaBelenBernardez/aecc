import Image from "next/image";
import { useModalEventStore } from "../../../store";
import Link from "next/link";

export const DashboardCardEvent = ({ id, photo, title, warning }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo}`;

  const openModalDeleteEvent = useModalEventStore(
    (state) => state.openModalDeleteEvent
  );

  const openModalEditEvent = useModalEventStore(
    (state) => state.openModalEditEvent
  );

  const idEvent = useModalEventStore((state) => state.setIdDeleteEvent);

  const deleteEvent = (id) => {
    openModalDeleteEvent();
    idEvent(id);
  };

  const editEvent = (id) => {
    openModalEditEvent();
    idEvent(id);
  };

  return (
    <article className="flex flex-col justify-between p-8 items-center shadow-md md:flex-row lg:w-[80%] md:w-[90%]">
      <div className="flex items-center lg:gap-10 lg:w-full">
        <div className="flex items-center gap-5">
          <Image
            src={imgSrc}
            width={100}
            height={100}
            alt="Imagen del evento"
          />
          <h2 className="font-bold px-6">{title}</h2>
        </div>
        {warning ? (
          <Link className="cursor-pointer" href="/noticias">
            <div className="flex bg-[#FF3C37] py-2 px-4 gap-2 items-center justify-center rounded-full md:mr-10 lg:mt-0">
              <Image
                src={"/image/warning.svg"}
                width={40}
                height={40}
                alt="Aviso"
                className="lg:w-6 lg:h-6"
              />
              <p className="text-white hidden lg:block ">Aviso importante</p>
            </div>
          </Link>
        ) : null}
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => editEvent(id)}
          className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0"
        >
          <Image
            src={"/icons/editIcon.svg"}
            width={24}
            height={24}
            alt="Icono de editar"
          />
          EDITAR
        </button>
        <button
          onClick={() => deleteEvent(id)}
          className="flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed md:mt-0"
        >
          <Image
            src={"/icons/deleteIcon.svg"}
            width={24}
            height={24}
            alt="Icono de eliminar"
          />
          ELIMINAR
        </button>
      </div>
    </article>
  );
};
