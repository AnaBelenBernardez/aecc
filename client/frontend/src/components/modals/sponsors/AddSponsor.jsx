"use client"

import { useState } from 'react';
import Image from 'next/image';
import { addSponsorService } from '../../../service';

function AddSponsor ({setClickedAdd, sponsorsList, setSponsorsList, token}){
  const [name, setName] = useState("");
  const [galician_name, setGalicianName] = useState("");
  const [description, setDescription] = useState("");
  const [galician_description, setGalicianDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [errorEdit, setErrorEdit] = useState("");


  function handleChange(e){
    const {name}= e.target;
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    
    switch(name){
        case 'name':
          setName(value);
          break;
        case 'galician_name':
          setGalicianName(value);
          break;
        case 'description':
          setDescription(value);    
          break;
        case 'galician_description':
          setGalicianDescription(value);    
          break;
        case 'logo':
          setLogo(value);
          setLogoPreview(URL.createObjectURL(value));
        default: 
          break;
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    let newSponsor;
    const data = new FormData (e.target);

    try{
      newSponsor = await addSponsorService(data, token);
    }catch(e){
      setErrorEdit(e.message);
    } finally{
      setClickedAdd(false);

      const newSponsorsList = [...sponsorsList];

      newSponsorsList.push(newSponsor);

      setSponsorsList(newSponsorsList);
    }
}

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-[90vw] h-[90vh] md:h-[60vh] lg:h-[80vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 overflow-auto md:overflow-hidden lg:overflow-auto">
          <fieldset>
              <ul className='flex flex-col gap-4'>
                  <li className='flex flex-col gap-2'>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en castellano</h3>
                    <label htmlFor='name' className='text-sm font-bold'>
                        Nombre
                        <input onChange={handleChange} type="text" name="name" id="name" required minLength={5} maxLength={40} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                    <label htmlFor='description' className='text-sm font-bold'>
                        Descripción
                        <input onChange={handleChange} type="text" name="description" id="description" required minLength={5} maxLength={200} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                  </li>
                  <li className='flex flex-col gap-2'>
                    <h3 className="text-primaryGreen font-bold text-lg">Formulario en gallego</h3>
                    <label htmlFor='galician_name' className='text-sm font-bold'>
                        Nome
                        <input onChange={handleChange} type="text" name="galician_name" id="galician_name" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                    <label htmlFor='galician_description' className='text-sm font-bold'>
                        Descrición
                        <input onChange={handleChange} type="text" name="galician_description" id="galician_description" required minLength={5} maxLength={300} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                          file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                          border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                          font-normal not-italic w-full">
                        </input>
                    </label>
                    </li>
                    <li className='flex flex-col gap-2'>
                      <label htmlFor="logo" className="lg:self-start flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
                        <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='Añadir logo' />AÑADIR
                          <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
                          id="logo" type="file" name='logo' accept='image/*' onChange={handleChange}
                          />
                      </label>
                      {logoPreview && 
                        <figure className="flex justify-center">
                            <Image src={logoPreview} width={150} height={50} alt="Previsualización del logo" />
                            <figcaption className="hidden">Previsualización</figcaption>
                        </figure>
                      }
                    </li>
                  {errorEdit && <li className='flex flex-col gap-2'><p className="text-xs text-secondRed">{errorEdit}</p></li>}
                  <li className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
                    <button type="submit" className='self-center border-2 mt-4 w-[157px] h-[42px] border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold py-2 px-6 lg:self-end lg:mb-2
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
                    >
                      GUARDAR
                    </button>
                    <button 
                      type='button' 
                      className='flex self-center mt-2 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                      onClick={() => setClickedAdd(false)}
                    >
                      CANCELAR
                    </button>
                  </li>
              </ul>
          </fieldset>
        </form>
      </div>
    </div>
  )
};

export default AddSponsor;