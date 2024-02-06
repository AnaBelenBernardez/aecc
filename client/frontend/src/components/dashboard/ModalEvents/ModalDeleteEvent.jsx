import Image from "next/image";
import { useModalEventStore } from "../../../store";
import { deleteEventService } from "../../../service";

const ModalDeleteEvent = ({ token, refetch }) => {
  const isModalDeleteEventOpen = useModalEventStore(
    (state) => state.isModalDeleteEventOpen
  );
  const closeModalDeleteEvent = useModalEventStore(
    (state) => state.closeModalDeleteEvent
  );
  const id = useModalEventStore((state) => state.idDeleteEvent);

  const handleClickDelete = async () => {
    await deleteEventService(id, token);
    closeModalDeleteEvent();
    refetch();
  };

  return (
    <>
      {isModalDeleteEventOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[70vw] max-h-[40vh] bg-secondLightGray p-4 rounded-xl shadow-xl lg:w-[40vw]">
            <p className="font-bold text-lg text-balance text-center">
              ¿Estás seguro de que quieres eliminar este evento?
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleClickDelete}
                className="flex gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed"
              >
                <Image
                  src={"/icons/deleteIcon.svg"}
                  width={24}
                  height={24}
                  alt="Icono de papelera"
                />
                ELIMINAR
              </button>
              <button
                onClick={closeModalDeleteEvent}
                className="flex gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondLightGray"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDeleteEvent;
