"use client"

import { useEffect, useState } from 'react';
import { editNewService } from '../../../service';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const EditNewModal = ({currentNew, setEditNewModalOpen, token, refetch}) => {
  const { toast } = useToast();
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    convertImg();
  }, []);
  
  const urlToFile = async (url, filename) => {
  
    const response = await fetch(url);

    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const convertImg = async () => {
    const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentNew.photo}`;
    const img = await urlToFile(imgSrc, 'photo');
    setImage(img);
    setFormValues({
      ...formValues,
      photo: img
    })
  };

  const previousImg = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentNew.photo}`

  const [formValues, setFormValues] = useState({
    title: currentNew.title,
    content: currentNew.content,
    link: currentNew.link,
    galician_title: currentNew.galician_title,
    galician_content: currentNew.galician_content
  })

  const handleChange = (e) => {
    const newFormValues = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: newFormValues
    });
  };

  const handleChangeImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editNewService(formValues, currentNew.id, token);
      setEditNewModalOpen(false);      
      refetch();
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
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
        <form className='flex flex-col gap-2 overflow-auto' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="title" className='font-bold text-sm'>
            Título
            <input type="text" id='title' name='title' className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium'
                defaultValue={formValues.title} onChange={handleChange}
            />
          </label>
          <label htmlFor="content" className='font-bold text-sm'>
            Contenido
              <textarea 
                type="text" 
                className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                id='content' name='content' cols="20" rows="20" defaultValue={formValues.content} onChange={handleChange}
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
              id='link' name='link' defaultValue={formValues.link} onChange={handleChange}
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
              currentNew.photo !== null
              ? <div className='min-w-20 min-h-20 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                  <Image src={file !== null ? file : previousImg} width={150} height={72} alt='Imagen de la noticia' className='w-[150px] h-[72px] object-contain'/>
                </div>
              : <div className='min-w-20 min-h-20 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                  <Image src={'/image/userDefault.png'} width={150} height={72} alt='Imagen de la noticia' className='rounded-full object-cover w-20 h-20'/>
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
              id='galician_title' name='galician_title' defaultValue={formValues.galician_title} onChange={handleChange}
            />
          </label>
          <label htmlFor="galician_content" className='font-bold mt-4 text-sm'>
            Contido
            <textarea 
              type="text" 
              className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
              id='galician_content' name='galician_content' cols="20" rows="20" defaultValue={formValues.galician_content} onChange={handleChange}
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