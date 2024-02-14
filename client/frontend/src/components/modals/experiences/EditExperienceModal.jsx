"use client"

import { useEffect, useState } from 'react';
import { editExperienceService } from '../../../service';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const EditExperienceModal = ({setEditSuccess, currentExperience, setEditExperienceModalOpen, token, refetch}) => {
    const { toast } = useToast();
  const [image, setImage] = useState();
  const [file, setFile] = useState(null)
  
  useEffect(() => {
    convertImg();
  }, []);
  
  const urlToFile = async (url, filename) => {
  
    const response = await fetch(url);

    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  
  const convertImg = async () => {
    const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentExperience.photo}`;
    const img = await urlToFile(imgSrc, 'photo');
    setImage(img);
    setFormValues({
      ...formValues,
      photo: image
    })
  };

  const previousImg = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentExperience.photo}`;

  const [formValues, setFormValues] = useState({
    name: currentExperience.name,
    content: currentExperience.content,
    galician_content: currentExperience.galician_content
  })

  const handleChange = (e) => {
    const experienceFormValues = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: experienceFormValues
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editExperienceService(formValues, currentExperience.id, token);
      setEditExperienceModalOpen(false); 
      refetch();
      setEditSuccess(true);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold"
      })
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[80vw] h-[92vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:h-[75vh] md:max-h-[65%] lg:max-h-[90%]'>
      <button onClick={() => setEditExperienceModalOpen(false)} className="absolute top-5 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
              <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
            </button>
        <form className='flex flex-col gap-2 overflow-auto md:max-w-[90%] min-w-[90%] self-center md:overflow-hidden lg:overflow-auto ' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="name" className='font-bold text-sm'>
            Nombre
            <input 
                required
                minLength={3}
                maxLength={40}
                type="text" 
                className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium'
                id='name' name='name' 
                defaultValue={formValues.name} onChange={handleChange}
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
                id='content' name='content' cols="20" rows="20" defaultValue={formValues.content} onChange={handleChange}
              />
          </label>
         
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en gallego</h2>
          
          <label htmlFor="galician_content" className='font-bold text-sm'>
            Contenido en gallego
            <textarea 
              required
              minLength={3}
              maxLength={500}
              type="text" 
              className="w-full h-24 focus-visible:ring-0 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray border-b-2 border-secondGray resize-none font-medium"
              id='galician_content' name='galician_content' cols="20" rows="20" defaultValue={formValues.galician_content} onChange={handleChange}
            />
          </label>
          <div className='flex flex-row gap-4 sm:w-auto'>
          {
            currentExperience.photo !== null
            ? <div className='min-w-20 min-h-20 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                  <Image src={file !== null ? file : previousImg} width={150} height={150} alt='Imagen de la noticia' className='rounded-full w-20 h-20'/>
                </div>
            : <div className='min-w-20 min-h-20 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                  <Image src={'/image/userDefault.png'} width={150} height={150} alt='Imagen de la noticia' className='rounded-full object-cover w-20 h-20'/>
                </div>
          }
                  
                <label htmlFor="photo" className="lg:self-center sm:align-middle md:w-auto flex gap-4 items-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 cursor-pointer">
               <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />EDITAR FOTO
                <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
                id="photo" type="file" name='photo' onChange={handleChangeImage}
                />

              </label>
          </div>
          <div className='flex flex-col items-center gap-1 sm:justify-center sm:mb-0 lg:flex-row lg:gap-4 lg:self-end'>
            <button
              type='submit'
              className='self-center md:mt-2 lg:mb-0 sm:mb-2 border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
            hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              GUARDAR CAMBIOS
            </button>
            <button type='button' className='flex self-center md:mt-2 sm:mt-2 md:mb-0 sm:mb-0 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray lg:mb-0'
              onClick={() => setEditExperienceModalOpen(false)}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
};

export default EditExperienceModal;