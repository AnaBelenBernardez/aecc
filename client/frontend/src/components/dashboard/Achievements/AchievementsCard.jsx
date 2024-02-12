import Image from "next/image";
import { useModalEventStore } from "../../../store";

export const AchievementsCard = ({ id, photo, title }) => {
  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo}`;

  const openModalDeleteAchievements = useModalEventStore(
    (state) => state.openModalDeleteAchievements
  );

  const openModalEditEventAchievements = useModalEventStore(
    (state) => state.openModalEditAchievements
  );

  const idAchievements = useModalEventStore((state) => state.setIdDeleteEvent);

  const deleteAchievements = (id) => {
    openModalDeleteAchievements();
    idAchievements(id);
  };

  const editAchievements = (id) => {
    openModalEditEventAchievements();
    idAchievements(id);
  };

  return (
    <article className="flex flex-col justify-between p-8  items-center shadow-md md:flex-row lg:w-[80%] md:w-[90%]">
      <div className="flex items-center gap-5">
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt="Imagen del logro"
          xmlns="http://www.w3.org/2000/svg"
        />
        <p className="font-bold px-6 overflow-ellipsis overflow-hidden w-80 lg:w-[650px]">
          {title}
        </p>
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => editAchievements(id)}
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
          onClick={() => deleteAchievements(id)}
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
