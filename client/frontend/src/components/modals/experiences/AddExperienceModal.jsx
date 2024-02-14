"use client"

import { useState } from 'react';
import { addExperienceService } from '../../../service';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const AddExperienceModal = ({setAddSuccess, setAddExperienceModalOpen, token, refetch}) => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    content: '',
    galician_content: '',
    photo: ''
  });

  const handleChange = (e) => {
    const experienceFormValues = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: experienceFormValues
    });
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExperienceService(token, formValues);
      setAddExperienceModalOpen(false);
      refetch();
      setAddSuccess(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold"
      })
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[80vw] h-[70vh]  bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] md:max-h-[70%] lg:max-h-[90%]  '>
      <button onClick={() => setAddExperienceModalOpen(false)} className="absolute top-5 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
              <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
            </button>
        <form className='flex flex-col gap-2 overflow-auto md:max-w-[90%] min-w-[90%] self-center md:overflow-hidden' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
            <label htmlFor="name" className='font-bold text-sm'>
              Nombre
              <input 
                required
                minLength={3}
                maxLength={40}
                type="text" 
                className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium"
                id='name' name='name'
                onChange={handleChange}
              />
              </label>
              <label htmlFor="content" className='font-bold text-sm'>
                Contenido
                <textarea
                  required
                  minLength={3}
                  maxLength={500} 
                  type="text" 
                  className="w-full h-24 focus-visible:ring-0 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray border-b-2 border-secondGray resize-none font-medium"
                  id='content' name='content' cols="20" rows="20"
                  onChange={handleChange}
                />
              </label>
              <h2 className='font-bold text-lg mt-2 text-primaryGreen'>Formulario en gallego</h2>
          
              <label htmlFor="galician_content" className='font-bold text-sm'>
                Contenido en gallego
                <textarea
                  required
                  minLength={3}
                  maxLength={500} 
                  type="text" 
                  className="w-full h-24 focus-visible:ring-0 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray border-b-2 border-secondGray resize-none font-medium"
                  id='galician_content' name='galician_content' cols="20" rows="20"
                  onChange={handleChange}
                />
              </label>
              <div className='flex flex-col lg:flex-row lg:self-start lg:gap-4 lg:items-center'>
                {
                  file !== null && (
                    <Image src={file} width={150} height={150} alt='Imagen de la noticia' className='rounded-full w-20 h-20'/>
                
                  )
                }
                <label htmlFor="photo" className="flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
                 <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />AÑADIR
                  <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                  id="photo" type="file" name='photo' onChange={handleChangeImage}
                  />
                </label>
              </div>

              <div className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
                <button
                  type='submit'
                  className='self-center border-2 mt-2 lg:mt-0 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
                  onChange={handleChange}
                >
                  AÑADIR EXPERIENCIA
                </button>
                <button
                  type='button'
                  className='flex self-center mt-2 lg:mt-0 gap-4 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                  onClick={() => setAddExperienceModalOpen(false)}
                >
                  CANCELAR
                </button>
              </div>
        </form>
      </div>
      < Toaster />
    </div>
  )
};

export default AddExperienceModal;