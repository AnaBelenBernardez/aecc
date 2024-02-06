import Image from "next/image";
import { useModalEventStore } from "../../../store";

export const DashboardCardEvent = ({ id, photo, title }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo}`;

  const openModalDeleteEvent = useModalEventStore(
    (state) => state.openModalDeleteEvent
  );

  const openModalEditEvent = useModalEventStore(
    (state) => state.openModalEditEvent
  );

  const idDeleteEvent = useModalEventStore((state) => state.setIdDeleteEvent);

  const deleteEvent = (id) => {
    openModalDeleteEvent();
    idDeleteEvent(id);
  };

  const editEvent = (id) => {
    openModalEditEvent();
    idDeleteEvent(id);
  };

  return (
    <article className="flex flex-col justify-between p-8 items-center shadow-md md:flex-row lg:w-[80%]">
      <div className="flex items-center gap-5">
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt="Imagen de la noticia"
        />
        <h2 className="font-bold px-6">{title}</h2>
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
