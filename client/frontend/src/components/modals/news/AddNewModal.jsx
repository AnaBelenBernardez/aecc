"use client"

import { useState } from 'react';

const AddNewModal = () => {
  const [nextForm, setNextForm] = useState(false);

  const handleClickNext = () => {
    setNextForm(true);
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center'>
        <form className='flex flex-col gap-4'>
          {
            !nextForm
              ? <>
                  <label htmlFor="title" className='font-bold'>
                    Título
                    <input 
                      type="text" 
                      className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                      file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                      border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                      placeholder:italic placeholder:text-slate-400 w-full"
                      id='title' name='title'
                    />
                  </label>
                  <label htmlFor="content" className='font-bold'>
                    Contenido
                    <textarea 
                      type="text" 
                      className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4"
                      id='content' name='content' cols="20" rows="20"
                    />
                  </label>
                    <label htmlFor="link" className='font-bold'>
                      Link
                      <input 
                        type="url" 
                        className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                        file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                        border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                        placeholder:italic placeholder:text-slate-400 w-full"
                        id='link' name='link'
                      />
                  </label>
                  <label htmlFor="image" className='font-bold mt-4'>
                    Foto de la noticia
                    <input type="file" 
                      id='image' name='image'
                    />
                  </label>
                  <button 
                    type='button' 
                    className='border border-primaryGreen py-2 px-6 mt-6 rounded-3xl font-bold text-sm text-primaryGreen self-end'
                    onClick={handleClickNext}
                  >
                    SIGUIENTE
                  </button>
                </>
              : <p>Hola</p>
          }
        </form>
      </div>
    </div>
  )
};

export default AddNewModal;