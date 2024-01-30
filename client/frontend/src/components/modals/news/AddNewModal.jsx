"use client"

import { useState } from 'react';
import { addNewService } from '../../../service';

const AddNewModal = ({setAddNewModalOpen, token, refetch}) => {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    link: '',
    galician_title: '',
    galician_content: '',
    photo: ''
  });

  const handleChange = (e) => {
    const newFormValues = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: newFormValues
    });
  }

  const handleChangeImage = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewService(token, formValues);
      setAddNewModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
        <form className='flex flex-col gap-2 overflow-scroll' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
            <label htmlFor="title" className='font-bold text-sm'>
              Título
              <input 
                type="text" 
                className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium"
                id='title' name='title'
                onChange={handleChange}
              />
              </label>
              <label htmlFor="content" className='font-bold text-sm'>
                Contenido
                <textarea 
                  type="text" 
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id='content' name='content' cols="20" rows="20"
                  onChange={handleChange}
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
                  id='link' name='link'
                  onChange={handleChange}
                />
              </label>
              <label className="font-bold text-sm" htmlFor="photo">
                Foto de la noticia
                <input className="w-full cursor-pointer mt-2 text-sm font-medium" 
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
                  placeholder:italic placeholder:text-slate-400 w-full font-medium"
                  id='galician_title' name='galician_title'
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="galician_content" className='font-bold mt-4 text-sm'>
                Contido
                <textarea 
                  type="text" 
                  className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
                  id='galician_content' name='galician_content' cols="20" rows="20"
                  onChange={handleChange}
                />
              </label>
              <div className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
                <button
                  type='submit'
                  className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
                  onChange={handleChange}
                >
                  AÑADIR NOTICIA
                </button>
                <button
                  type='button'
                  className='flex self-center mt-2 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                  onClick={() => setAddNewModalOpen(false)}
                >
                  CANCELAR
                </button>
              </div>
        </form>
      </div>
    </div>
  )
};

export default AddNewModal;