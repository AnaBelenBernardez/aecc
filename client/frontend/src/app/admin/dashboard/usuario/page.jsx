"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../../../store";
import { changePwd } from "../../../../service";
import Image from "next/image";
import { useToast } from "../../../../components/ui/use-toast";
import { Toaster } from "../../../../components/ui/toaster";

const EditUser = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!token) {
     router.push("/admin");
    }
  }, [token])

  const [formValues, setFormValues] = useState({
    oldPwd: "",
    newPwd: "",
  });
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const handleChange = (e) => {
    const newFormValues = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: newFormValues,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await changePwd(token, formValues);
      toast({
        variant: "succes",
        title: "Contraseña cambiada correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold",
      });
      setTimeout(()=>{
        router.push("/admin/dashboard");
      },2000)
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold",
      });
    }
  };

  const handleTogglePasswordOldVisibility = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const handleTogglePasswordNewVisibility = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const handleCancel = () => {
    router.push("/admin/dashboard");
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <Image
          src={"/logos/CC_Logo_transicion_color_pos.rgb.svg"}
          height={150}
          width={150}
          className="mt-6 mb-6"
          alt="Logo de la asociación"
        />
        <div className="w-full h-[400px] bg-secondLightGray rounded-xl mb-9 mt-1 p-8 md:w-[400px]">
          <form
            className="flex flex-col items-center justify-center gap-5 h-full"
            onSubmit={handleSubmit}
          >
            <label htmlFor="oldPwd" className="text-sm font-semibold relative">
              Introduce la contraseña actual
              <input
                type={showPasswordOld ? "text" : "password"}
                name="oldPwd"
                id="oldPwd"
                className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
                file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray 
                focus-visible:ring-0 focus:border-b-green-600 w-72 placeholder:italic placeholder:text-slate-400"
                onChange={handleChange}
                required
                placeholder='Escriba aquí su contraseña actual'
              />
              <button
                type="button"
                onClick={handleTogglePasswordOldVisibility}
                className="absolute top-7 right-0"
              >
                <Image
                  alt="Mostrar/ocultar contraseña"
                  width={24}
                  height={24}
                  src={
                    showPasswordOld ? "/icons/closeEye.svg" : "/icons/openEye.svg"
                  }
                />
              </button>
            </label>
            <label htmlFor="newPwd" className="text-sm font-semibold relative">
              Nueva contraseña
              <input
                type={showPasswordNew ? "text" : "password"}
                name="newPwd"
                id="newPwd"
                className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
                file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray 
                focus-visible:ring-0 focus:border-b-green-600 w-72 placeholder:italic placeholder:text-slate-400"
                onChange={handleChange}
                required
                placeholder='Escriba aquí su nueva contraseña'
              />
              <button
                type="button"
                onClick={handleTogglePasswordNewVisibility}
                className="absolute top-7 right-0"
              >
                <Image
                  alt="Mostrar/ocultar contraseña"
                  width={24}
                  height={24}
                  src={
                    showPasswordNew ? "/icons/closeEye.svg" : "/icons/openEye.svg"
                  }
                />
              </button>
            </label>
            <div className="flex flex-col gap-6 mt-10">
              <button
                type="submit"
                className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2
                hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen"
              >
                CONFIRMAR
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-secondRed border-2 border-secondRed font-bold rounded-3xl text-sm px-10 py-2 hover:text-secondLightGray hover:bg-secondRed"
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default EditUser;
