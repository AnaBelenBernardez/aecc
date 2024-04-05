import { useModalEventStore } from "../../../store";
import { useForm } from "react-hook-form";
import { addEvent } from "../../../service";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { placeLocation } from "../../../lib/locations";
import useFilePreview from "../../../hooks/useFilePreview";
import Image from "next/image";

export const ModalEvents = ({ token, refetch }) => {
  const isModalEventOpen = useModalEventStore(
    (state) => state.isModalEventOpen
  );
  const closeModal = useModalEventStore((state) => state.closeModalEvent);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { toast } = useToast();
  
  const photo = watch("photo");
  const [filePreview] = useFilePreview(photo);
  
  const onSubmit = async (data) => {
    const eventData = await addEvent(token, data);
    try {
      closeModal();
      refetch();
      toast({
        variant: "success",
        title: eventData.message,
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
      {isModalEventOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">

          <div className="relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12">
            <button onClick={closeModal} className="absolute top-6 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
              <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
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
              {errors.title && (
                <span className="text-secondRed text-sm">
                  Este campo es obligatorio
                </span>
              )}
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
              {errors.content && (
                <span className="text-secondRed text-sm">
                  Este campo es obligatorio
                </span>
              )}
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
                {errors.link && (
                  <span className="text-secondRed text-sm">
                    Este campo es obligatorio
                  </span>
                )}
              <div className="flex flex-row justify-between w-full">
                <label htmlFor="date_start" className="font-bold text-sm min-w-[48%]">
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
                {errors.date_start && (
                  <span className="text-secondRed text-sm">
                    Este campo es obligatorio
                  </span>
                )}
                <label htmlFor="date_end" className="font-bold text-sm min-w-[48%]">
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
                {errors.date_end && (
                  <span className="text-secondRed text-sm">
                    Este campo es obligatorio
                  </span>
                )}
              </div>                
              <div className="flex flex-col md:flex-row md:justify-between ">
                <label htmlFor="location" className="font-bold text-sm md:min-w-[48%]">
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
                {errors.location && (
                  <span className="text-secondRed text-sm">
                    Este campo es obligatorio
                  </span>
                )}
                <label htmlFor="event_type" className="font-bold text-sm md:min-w-[48%]">
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
                    <option value="Comidas y cenas">Comidas y cenas</option>
                    <option value="Otros">Otros</option>
                  </select>
                </label>
                {errors.event_type && (
                  <span className="text-secondRed text-sm">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
              <label className="font-bold text-sm" htmlFor="photo">
                Foto de portada
                <div className="flex flex-col md:flex-row md:items-center  gap-2 w-full mt-2">
                  {filePreview ? (
                    <div className="w-28">
                      <Image
                        src={filePreview}
                        alt="preview"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : null}
                <label htmlFor="photo" className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
                 <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />AÑADIR
                  <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                  id="photo"
                  type="file" 
                  name='photo'
                  {...register("photo", { required: true })}
                  />
                </label>
                </div>
              </label>
              {errors.photo && (
                <span className="text-secondRed text-sm">
                  Este campo es obligatorio
                </span>
              )}
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
              {errors.galician_title && (
                <span className="text-secondRed text-sm">
                  Este campo es obligatorio
                </span>
              )}
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
              {errors.galician_content && (
                <span className="text-secondRed text-sm">
                  Este campo es obligatorio
                </span>
              )}
              <div className="mr-2 flex flex-col items-center lg:flex-row lg:self-end lg:items-center lg:gap-4">
                <button
                  type="submit"
                  className="self-center lg:mb-2 border-2 mt-2 lg:mt-0 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
                >
                  AÑADIR EVENTO
                </button>
                <button
                  type="button"
                  className="flex self-center lg:mb-2 mt-2 lg:mt-0 gap-4 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray"
                  onClick={closeModal}
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
