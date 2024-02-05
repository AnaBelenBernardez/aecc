"use client"

import { useState } from 'react';
import { addExperienceService } from '../../../service';
import Image from 'next/image';

const AddExperienceModal = ({setAddExperienceModalOpen, token, refetch}) => {
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
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExperienceService(token, formValues);
      setAddExperienceModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  }
console.log(formValues);
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[80vw] h-[85vh]  bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12 md:max-h-[70%] lg:max-h-[90%]  '>
        <form className='flex flex-col gap-2 overflow-scroll md:max-w-[90%] min-w-[90%] self-center md:overflow-hidden' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
            <label htmlFor="name" className='font-bold text-sm'>
              Nombre
              <input 
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
                  type="text" 
                  className="w-full h-24 focus-visible:ring-0 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray border-b-2 border-secondGray resize-none font-medium"
                  id='galician_content' name='galician_content' cols="20" rows="20"
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="photo" className="lg:self-start flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center">
               <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />AÑADIR
                <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
                id="photo" type="file" name='photo' onChange={handleChangeImage}
                />

              </label>

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
                  className='flex self-center mt-2 lg:mt-0 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                  onClick={() => setAddExperienceModalOpen(false)}
                >
                  CANCELAR
                </button>
              </div>
        </form>
      </div>
    </div>
  )
};

export default AddExperienceModal;