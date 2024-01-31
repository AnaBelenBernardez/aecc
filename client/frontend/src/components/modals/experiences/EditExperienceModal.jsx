"use client"

import { useEffect, useState } from 'react';
import { editExperienceService } from '../../../service';
import Image from 'next/image';

const EditExperienceModal = ({currentExperience, setEditExperienceModalOpen, token, refetch}) => {
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
    const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentExperience.photo}`;
    const img = await urlToFile(imgSrc, 'photo');
    setImage(img);
    setFormValues({
      ...formValues,
      photo: img
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
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editExperienceService(formValues, currentExperience.id, token);
      setEditExperienceModalOpen(false);      
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  }

console.log(formValues.photo);
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="name" className='font-bold text-sm'>
            Nombre
            <input type="text" id='name' name='name' className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium'
                defaultValue={formValues.name} onChange={handleChange}
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
         
          <h2 className='font-bold text-lg mt-6 text-primaryGreen'>Formulario en gallego</h2>
          
          <label htmlFor="galician_content" className='font-bold mt-4 text-sm'>
            Contenido en gallego
            <textarea 
              type="text" 
              className="w-full h-40 focus:ring-2 focus:ring-green-600 p-4 bg-secondLightGray resize-none font-medium"
              id='galician_content' name='galician_content' cols="20" rows="20" defaultValue={formValues.galician_content} onChange={handleChange}
            />
          </label>
          <label className="font-bold text-sm" htmlFor="photo">
              <button className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0'>
               <Image src={previousImg} width={24} height={24} alt='añadir imagen'/>EDITAR
                <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
                id="photo" type="file" name='photo' onChange={handleChangeImage}
                />
                </button>
              </label>
          <div className='flex flex-col items-center lg:flex-row lg:gap-4 lg:self-end'>
            <button
              type='submit'
              className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
            hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              GUARDAR CAMBIOS
            </button>
            <button type='button' className='flex self-center mt-2 mb-4 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray lg:mb-0'
              onClick={() => setEditExperienceModalOpen(false)}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default EditExperienceModal;