import Image from "next/image";
import { useModalEventStore } from "../../../store";
import { useForm } from "react-hook-form";
import useFilePreview from "../../../hooks/useFilePreview";
import { addAchievement } from "../../../service";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const ModalAchievement = ({ token, refetch }) => {
  const isModaAchievementOpen = useModalEventStore(
    (state) => state.isModalAchievementsOpen
  );
  const closeModal = useModalEventStore(
    (state) => state.closeModalAchievements
  );

  let photo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { toast } = useToast();

  photo = watch("icon");

  const [filePreview, setFilePreview] = useFilePreview(photo);

  const onSubmit = async (data) => {
    try {
      const eventData = await addAchievement(token, data);
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

  const handleCloseModal = () => {
    closeModal();
    setFilePreview(null);
  };

  return (
    <>
      {isModaAchievementOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12">
            <button
              onClick={handleCloseModal}
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
              <label htmlFor="description" className="font-bold text-sm">
                Descripción
                <textarea
                  type="text"
                  className="w-full h-30 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="description"
                  name="description"
                  cols="5"
                  rows="5"
                  placeholder="Escriba aquí el logro"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "La descripción del logro tiene que tener más de 3 caracteres.",
                    },
                    maxLength: {
                      value: 200,
                      message:
                        "La descripción no puede tener más de 200 caracteres.",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.description?.message}
              </span>
              <label className="font-bold text-sm" htmlFor="icon">
                Icono
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
                  htmlFor="icon"
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
                    id="icon"
                    type="file"
                    name="icon"
                    {...register("icon", {
                      required: {
                        value: true,
                        message: "Este campo es obligatorio",
                      },
                    })}
                  />
                </label>
              </div>
              <span className="text-secondRed text-sm">
                {errors.icon?.message}
              </span>
              <h2 className="font-bold text-lg mt-6 text-primaryGreen">
                Formulario en gallego
              </h2>
              <label
                htmlFor="galician_description"
                className="font-bold mt-4 text-sm"
              >
                Descrición
                <textarea
                  type="text"
                  className="w-full h-30 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="galician_description"
                  name="galician_description"
                  cols="5"
                  rows="5"
                  placeholder="Escriba aquí o seu logro"
                  {...register("galician_description", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "La descripción del logro tiene que tener más de 3 caracteres.",
                    },
                    maxLength: {
                      value: 200,
                      message:
                        "La descripción no puede tener más de 200 caracteres.",
                    },
                  })}
                />
              </label>
              <span className="text-secondRed text-sm">
                {errors.galician_description?.message}
              </span>

              <div className="mr-2 flex flex-col items-center lg:flex-row lg:self-end lg:items-center lg:gap-4">
                <button
                  type="submit"
                  className="self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2
                    hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
                >
                  AÑADIR LOGRO
                </button>
                <button
                  type="button"
                  className="self-center my-2 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray"
                  onClick={handleCloseModal}
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
