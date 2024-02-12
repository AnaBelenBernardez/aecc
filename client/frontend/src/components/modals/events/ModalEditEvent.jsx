import { useModalEventStore } from "../../../store";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { editEventService } from "../../../service";
import { placeLocation } from "../../../lib/locations";

export const ModalEditEvents = ({ token, refetch, event }) => {
  const isModalEditEventOpen = useModalEventStore(
    (state) => state.isModalEditEventOpen
  );
  const closeModalEdit = useModalEventStore(
    (state) => state.closeModalEditEvent
  );
  const id = useModalEventStore((state) => state.idDeleteEvent);
  const editEvent = event.find((e) => e.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      link: "",
      galician_title: "",
      galician_content: "",
      date_start: "",
      date_end: "",
      warning: "",
      warning_content: "",
      galician_warning_content: "",
      location: "",
      event_type: "",
    },
  });

  useEffect(() => {
    let defaults = {
      title: editEvent?.title,
      content: editEvent?.content,
      link: editEvent?.link,
      galician_title: editEvent?.galician_title,
      galician_content: editEvent?.galician_content,
      date_start: editEvent?.date_start
        ? new Date(editEvent?.date_start).toISOString().slice(0, 10)
        : "",
      date_end: editEvent?.date_end
        ? new Date(editEvent?.date_end).toISOString().slice(0, 10)
        : "",
      warning: editEvent?.warning?.toString(),
      warning_content: editEvent?.warning_content,
      galician_warning_content: editEvent?.galician_warning_content,
      location: editEvent?.location,
      event_type: editEvent?.event_type,
    };
    reset(defaults);
  }, [editEvent, reset]);
  const { toast } = useToast();
  const onSubmit = async (data) => {
    try {
      await editEventService(id, token, data);
      closeModalEdit();
      refetch();
      toast({
        variant: "success",
        title: "Evento editado correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold",
      });
    }
  };

  return (
    <>
      {isModalEditEventOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12">
            <button
              onClick={closeModalEdit}
              className="absolute top-6 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300"
            >
              <img src="/icons/closeModals.svg" alt="Icono de cerrar" />
            </button>
            <form
              className="flex flex-col gap-2 overflow-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="font-bold text-lg text-primaryGreen">
                Formulario en castellano
              </h2>
              <label htmlFor="title" className="font-bold text-sm">
                Título
                <input
                  type="text"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="title"
                  name="title"
                  {...register("title", { required: true })}
                />
              </label>

              <label htmlFor="content" className="font-bold text-sm">
                Contenido
                <textarea
                  type="text"
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="content"
                  name="content"
                  cols="20"
                  rows="20"
                  {...register("content", { required: true })}
                />
              </label>
              <label htmlFor="date_start" className="font-bold text-sm">
                Fecha de inicio
                <input
                  type="date"
                  id="date_start"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("date_start", { required: true })}
                />
              </label>
              <label htmlFor="date_end" className="font-bold text-sm">
                Fecha de fin
                <input
                  type="date"
                  id="date_end"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("date_end", { required: true })}
                />
              </label>
              <label htmlFor="link" className="font-bold text-sm">
                Incidencia
                <div className="flex items-center justify-items-center gap-2 mt-2 w-20">
                  <p>Si</p>
                  <input
                    type="radio"
                    name="warning"
                    value="1"
                    className="my-2 h-5 mt-2 bg-background text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 font-medium"
                    {...register("warning")}
                  />

                  <p>No</p>
                  <input
                    type="radio"
                    name="warning"
                    value="0"
                    className="my-2 h-5 mt-2 bg-background text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 font-medium"
                    {...register("warning")}
                  />
                </div>
              </label>
              <label htmlFor="warning_content" className="font-bold text-sm">
                Tipo de incidencia
                <input
                  type="text"
                  name="warning_content"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("warning_content")}
                />
              </label>
              <label htmlFor="location" className="font-bold text-sm">
                Localización
                <select
                  id="event_type"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("location", { required: true })}
                >
                  {placeLocation.map((place) => (
                    <option value={place} key={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="link" className="font-bold text-sm">
                Link
                <input
                  type="url"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="link"
                  name="link"
                  {...register("link", { required: true })}
                />
              </label>
              <label htmlFor="event_type" className="font-bold text-sm">
                Tipo de evento
                <select
                  id="event_type"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("event_type", { required: true })}
                >
                  <option value="Andainas y carreras">
                    Andainas y carreras
                  </option>
                  <option value="Travesía a nado de Ribeira">
                    Travesía a nado de Ribeira
                  </option>
                  <option value="Torneo Pádel contra el Cáncer">
                    Torneo Pádel contra el Cáncer
                  </option>
                  <option value="A Coruña Bike">A Coruña Bike</option>
                  <option value="Otros">Otros</option>
                </select>
              </label>

              <h2 className="font-bold text-lg mt-6 text-primaryGreen">
                Formulario en gallego
              </h2>
              <label htmlFor="galician_title" className="font-bold text-sm">
                Título
                <input
                  type="text"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="galician_title"
                  name="galician_title"
                  {...register("galician_title", { required: true })}
                />
              </label>
              <label
                htmlFor="galician_content"
                className="font-bold mt-4 text-sm"
              >
                Contido
                <textarea
                  type="text"
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="galician_content"
                  name="galician_content"
                  cols="20"
                  rows="20"
                  {...register("galician_content", { required: true })}
                />
              </label>
              <label htmlFor="warning_content" className="font-bold text-sm">
                Tipo de incidencia
                <input
                  type="text"
                  name="galician_warning_content"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("galician_warning_content")}
                />
              </label>
              <div className="mr-2 flex flex-col items-center lg:flex-row lg:self-end lg:gap-4">
                <button
                  type="submit"
                  className="self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2
                    hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
                >
                  GUARDAR CAMBIOS
                </button>
                <button
                  type="button"
                  className="self-center my-2 gap-4 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray"
                  onClick={closeModalEdit}
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};
