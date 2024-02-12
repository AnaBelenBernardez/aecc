import { useModalEventStore } from "../../../store";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { editAchievementService } from "../../../service";
import useFilePreview from "../../../hooks/useFilePreview";

export const ModalEditAchievement = ({ token, refetch, achievement }) => {
  const isModalEditAchievementOpen = useModalEventStore(
    (state) => state.isModalEditAchievementsOpen
  );
  const closeModalAchievement = useModalEventStore(
    (state) => state.closeModalEditAchievements
  );
  const id = useModalEventStore((state) => state.idDeleteEvent);
  const editAchievement = achievement?.find((e) => e.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      description: "",
      galician_description: "",
      icon: editAchievement?.icon,
    },
  });

  const photo = watch("icon");
  const [filePreview] = useFilePreview(photo);

  useEffect(() => {
    let defaults = {
      description: editAchievement?.description,
      galician_description: editAchievement?.galician_description,
    };
    reset(defaults);
  }, [editAchievement, reset]);
  const { toast } = useToast();
  const onSubmit = async (data) => {
    try {
      await editAchievementService(id, token, data);
      closeModalAchievement();
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
      {isModalEditAchievementOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12">
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
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="description"
                  name="description"
                  cols="5"
                  rows="5"
                  {...register("description", { required: true })}
                />
              </label>
              <label className="font-bold text-sm" htmlFor="icon">
                Icono
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
                  <input
                    className="cursor-pointer mt-2 text-sm font-medium"
                    id="icon"
                    type="file"
                    name="icon"
                    {...register("icon")}
                  />
                </div>
              </label>
              <h2 className="font-bold text-lg mt-6 text-primaryGreen">
                Formulario en gallego
              </h2>
              <label
                htmlFor="galician_content"
                className="font-bold mt-4 text-sm"
              >
                Descrición
                <textarea
                  type="text"
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id="galician_description"
                  name="galician_description"
                  cols="5"
                  rows="5"
                  {...register("galician_description", { required: true })}
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
                  onClick={closeModalAchievement}
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
