"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Toaster } from "@/components/ui/toaster";

const EditNewModal = ({currentNew, setEditNewModalOpen, handleSubmitEdit, setFormValuesEdit, formValuesEdit}) => {
  const [newPhoto, setNeWPhoto] = useState();
  const [image, setImage] = useState();
  
  useEffect(() => {
    if (image) {
      convertImg();
    }
  }, [image]);
  
  const urlToFile = async (url, filename) => {
  
    const response = await fetch(url);

    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const convertImg = async () => {
    const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentNew.photo}`;
    const img = await urlToFile(imgSrc, 'photo');
    setImage(img)
    setFormValuesEdit({
      ...formValuesEdit,
      photo: image
    })
  };

  const previousImg = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentNew.photo}`;

  const handleChange = (e) => {
    const newformValuesEdit = e.target.value;
    setFormValuesEdit({
      ...formValuesEdit,
      [e.target.name]: newformValuesEdit
    });
  };
  
  const handleChangeImage = (e) => {
    setFormValuesEdit({
      ...formValuesEdit,
      [e.target.name]: [e.target.files]
    })
    setNeWPhoto(e.target.files);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
      <button onClick={() => setEditNewModalOpen(false)} className="absolute top-5 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
              <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
            </button>
        <form className='flex flex-col gap-2 overflow-auto' onSubmit={handleSubmitEdit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="title" className='font-bold text-sm'>
            Título
            <input type="text" id='title' name='title' className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium'
                defaultValue={currentNew.title} onChange={handleChange}
            />
          </label>
          <label htmlFor="content" className='font-bold text-sm'>
            Contenido
              <textarea 
                type="text" 
                className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                id='content' name='content' cols="20" rows="20" defaultValue={currentNew.content} onChange={handleChange}
              />
          </label>
          <label htmlFor="link" className='font-bold text-sm'>
            Link
            <input 
              type="url" 
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='link' name='link' defaultValue={currentNew.link} onChange={handleChange}
            />
          </label>
          <div className='flex flex-row-reverse justify-end gap-6 mt-4'>
            <label htmlFor="photo" className="lg:self-center flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
              <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />EDITAR FOTO
              <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                id="photo" type="file" name='photo' onChange={handleChangeImage}
              />
            </label>
            {
              newPhoto
                ? <div className='h-[72px] w-[150px]'>
                    <Image src={URL.createObjectURL(newPhoto[0])} width={150} height={72} alt='Fotos de la noticia' className='h-[72px] w-[150px] object-cover'/>
                  </div>
                : <div className='h-[72px] w-[150px]'>
                    <Image src={currentNew.photo !== null ? previousImg :'/image/newsDefault.png'} width={150} height={72} alt='Fotos de la noticia' className='h-[72px] w-[150px] object-cover'/>
                  </div>
            }
          </div>
          <h2 className='font-bold text-lg mt-6 text-primaryGreen'>Formulario en gallego</h2>
          <label htmlFor="galician_title" className='font-bold text-sm'>
            Título
            <input 
              type="text" 
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_title' name='galician_title' defaultValue={currentNew.galician_title} onChange={handleChange}
            />
          </label>
          <label htmlFor="galician_content" className='font-bold mt-4 text-sm'>
            Contido
            <textarea 
              type="text" 
              className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
              id='galician_content' name='galician_content' cols="20" rows="20" defaultValue={currentNew.galician_content} onChange={handleChange}
            />
          </label>
          <div className='flex flex-col items-center lg:flex-row lg:gap-4 lg:self-end lg:mb-2 lg:mr-2'>
            <button
              type='submit'
              className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
            hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              GUARDAR CAMBIOS
            </button>
            <button type='button' className='flex self-center mt-2 mb-4 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray lg:mb-0'
              onClick={() => setEditNewModalOpen(false)}
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

export default EditNewModal;