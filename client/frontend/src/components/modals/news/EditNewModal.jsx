"use client"

import { useEffect, useState } from 'react';
import { editNewService } from '../../../service';

const EditNewModal = ({currentNew, setEditNewModalOpen, token, refetch}) => {
  const [image, setImage] = useState();
  
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
      console.error(error.message);
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10'>
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center'>
        <form className='flex flex-col gap-2 overflow-scroll' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="title" className='font-bold text-sm'>
            Título
            <input type="text" id='title' name='title' className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full'
                defaultValue={formValues.title} onChange={handleChange}
            />
          </label>
          <label htmlFor="content" className='font-bold text-sm'>
            Contenido
              <textarea 
                type="text" 
                className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none"
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
              placeholder:italic placeholder:text-slate-400 w-full"
              id='link' name='link' defaultValue={formValues.link} onChange={handleChange}
            />
          </label>
          <label className="font-bold text-sm" htmlFor="photo">
            Foto de la noticia
            <input className="w-full cursor-pointer mt-2 text-sm" 
              id="photo" type="file" name='photo' onChange={handleChangeImage}
            />
          </label>
          <h2 className='font-bold text-lg mt-6 text-primaryGreen'>Formulario en gallego</h2>
          <label htmlFor="galician_title" className='font-bold text-sm'>
            Título
            <input 
              type="text" 
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full"
              id='galician_title' name='galician_title' defaultValue={formValues.galician_title} onChange={handleChange}
            />
          </label>
          <label htmlFor="galician_content" className='font-bold mt-4 text-sm'>
            Contido
            <textarea 
              type="text" 
              className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none"
              id='galician_content' name='galician_content' cols="20" rows="20" defaultValue={formValues.galician_content} onChange={handleChange}
            />
          </label>
          <button 
            type='submit' 
            className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2 
          hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
          >
            GUARDAR CAMBIOS
          </button>
          <button type='button' className='flex self-center mt-2 mb-4 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
            onClick={() => setEditNewModalOpen(false)}
          >
            CANCELAR
          </button>
        </form>
      </div>
    </div>
  )
};

export default EditNewModal;