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
  const [filePreview, setFilePreview] = useFilePreview(photo);

  const onSubmit = async (data) => {
    try {
      const eventData = await addEvent(token, data);
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

  const HandleCloseModal = () => {
    closeModal();
    setFilePreview(null);
  };

  return (
    <>
      {isModalEventOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12">
            <button
              onClick={HandleCloseModal}
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
                  placeholder="Excriba aquí el título del evento"
                  type="text"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                  border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="title"
                  name="title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "Mínimo de 2 caracteres de longitud",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo de 100 caracteres de longitud",
                    },
                  })}
                />
              </label>

              {errors.title && (
                <span className="text-secondRed text-sm">
                  {errors.title?.message}
                </span>
              )}

              <label htmlFor="content" className="font-bold text-sm">
                Contenido
                <textarea
                  placeholder="Escriba aquí el contenido del evento en castellano"
                  type="text"
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="content"
                  name="content"
                  cols="20"
                  rows="20"
                  {...register("content", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "Mínimo de 2 caracteres de longitud",
                    },
                    maxLength: {
                      value: 500,
                      message: "Máximo de 500 caracteres de longitud",
                    },
                  })}
                />
              </label>

              <span className="text-secondRed text-sm">
                {errors.content?.message}
              </span>

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
                  {...register("date_start", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.date_start?.message}
              </span>
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
                  {...register("date_end", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.date_end?.message}
              </span>
              <label htmlFor="location" className="font-bold text-sm">
                Localización
                <select
                  id="event_type"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
                >
                  {placeLocation.map((place) => (
                    <option value={place} key={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </label>
              <span className="text-secondRed text-sm">
                {errors.location?.message}
              </span>
              <label htmlFor="link" className="font-bold text-sm">
                Link
                <input
                  placeholder="https://www.estoesunejemplo.com"
                  type="url"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="link"
                  name="link"
                  {...register("link", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/,
                      message: "Introduce una URL válida",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.link?.message}
              </span>

              <label htmlFor="event_type" className="font-bold text-sm">
                Tipo de evento
                <select
                  id="event_type"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  {...register("event_type", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  })}
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
              <span className="text-secondRed text-sm">
                {errors.event_type?.message}
              </span>
              <label htmlFor="photo" className="font-bold text-sm">
                Foto de portada
              </label>
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
                <label
                  htmlFor="photo"
                  className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer"
                >
                  <Image
                    src={"/icons/addPhotoIcon.svg"}
                    width={24}
                    height={24}
                    alt="añadir imagen"
                  />
                  AÑADIR
                  <input
                    className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                    id="photo"
                    type="file"
                    name="photo"
                    {...register("photo", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                  />
                </label>
              </div>
              <span className="text-secondRed text-sm">
                {errors.photo?.message}
              </span>
              <h2 className="font-bold text-lg mt-6 text-primaryGreen">
                Formulario en gallego
              </h2>
              <label htmlFor="galician_title" className="font-bold text-sm">
                Título
                <input
                  placeholder="Escriba aqui el título en gallego"
                  type="text"
                  className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id="galician_title"
                  name="galician_title"
                  {...register("galician_title", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "Mínimo de 2 caracteres de longitud",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo de 100 caracteres de longitud",
                    },
                  })}
                />
              </label>

              <span className="text-secondRed text-sm">
                {errors.galician_title?.message}
              </span>
              <label
                htmlFor="galician_content"
                className="font-bold mt-4 text-sm"
              >
                Contido
                <textarea
                  placeholder="Escriba aqui el contenido del evento en gallego"
                  type="text"
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="galician_content"
                  name="galician_content"
                  cols="20"
                  rows="20"
                  {...register("galician_content", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "Mínimo de 2 caracteres de longitud",
                    },
                    maxLength: {
                      value: 500,
                      message: "Máximo de 500 caracteres de longitud",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.galician_content?.message}
              </span>
              <div className="mr-2 flex flex-col items-center lg:flex-row lg:self-end lg:items-center lg:gap-4">
                <button
                  type="submit"
                  className="self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2
                    hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
                >
                  AÑADIR EVENTO
                </button>
                <button
                  type="button"
                  className="self-center my-2 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray"
                  onClick={HandleCloseModal}
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
