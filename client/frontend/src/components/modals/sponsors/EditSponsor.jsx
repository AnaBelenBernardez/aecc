import React, { useState } from 'react'
import Image from 'next/image';
import { editSponsorService } from '../../../service';

function EditSponsor({currentSponsor, sponsorsList, setSponsorsList, sponsorId, setClickedEdit, setEditSuccess, setEditReject, setSearchSuccess, searchSuccess, token}) {

  const [name, setName] = useState(currentSponsor.name);
  const [galician_name, setGalicianName] = useState(currentSponsor.galician_name);
  const [description, setDescription] = useState(currentSponsor.description);
  const [galician_description, setGalicianDescription] = useState(currentSponsor.galician_description);
  const [logo, setLogo] = useState(currentSponsor.logo);
  const [important, setImportant] = useState(currentSponsor.important);
  const [link, setLink] = useState(currentSponsor.link);
  const [logoPreview, setLogoPreview] = useState(process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${logo}`);


  function setEditOpen(cancel){
    setClickedEdit(cancel);
  }

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
        value?.length && setLogo(value);
        value ? setLogoPreview(URL.createObjectURL(value)) : setLogoPreview(URL.revokeObjectURL(logoPreview));
        break;
      case 'important':
        setImportant(value);
        break;
      case 'link':
        setLink(value);
        break;
      default: 
        setEditReject("Ha ocurrido un error obteniendo los datos del formulario.")
        break;
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    let editedSponsor;
    let error;
    const data = new FormData (e.target);

    try{
      editedSponsor = await editSponsorService(data, token, sponsorId);
      setEditSuccess(true);
    }catch(e){
      setEditReject(e.message);
      error = true;
    } finally{
      if(!error){
        const findSponsor = sponsorsList.find((sponsor) => sponsor.id === parseInt(sponsorId));
        const indexEditedSponsor = sponsorsList.indexOf(findSponsor);
        const newSponsorsList = [...sponsorsList];
        newSponsorsList.splice(indexEditedSponsor, 1, editedSponsor);
        setSponsorsList(newSponsorsList);

        if(searchSuccess){
          setSearchSuccess(editedSponsor);
        }else{
          setSearchSuccess(false);
        }
        
        setClickedEdit(false);
      }
    }
  }
  
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[90vw] h-[90vh] md:h-[60vh] lg:h-[80vh] lg:w-[60vw] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center'>
        <button onClick={() => setClickedEdit(false)} className="absolute top-6 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
          <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 overflow-auto">
          <fieldset>
            <ul className='flex flex-col gap-4'>
              <li className='flex flex-col gap-2'>
                <h3 className="text-primaryGreen font-bold text-lg">Formulario en castellano</h3>
                <label htmlFor='name' className='text-sm font-bold'>
                  Nombre
                  <input onChange={handleChange} type="text" name="name" id="name" required minLength={5} maxLength={40} defaultValue={name} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    font-normal not-italic w-full">
                  </input>
                </label>
                <label htmlFor='description' className='text-sm font-bold'>
                  Descripción
                  <input onChange={handleChange} type="text" name="description" id="description" required minLength={5} maxLength={200} defaultValue={description} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
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
                  <input onChange={handleChange} type="text" name="galician_name" id="galician_name" required minLength={5} maxLength={300} defaultValue={galician_name} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    font-normal not-italic w-full">
                  </input>
                </label>
                <label htmlFor='galician_description' className='text-sm font-bold'>
                  Descrición
                  <input onChange={handleChange} type="text" name="galician_description" id="galician_description" required minLength={5} maxLength={300} defaultValue={galician_description} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    font-normal not-italic w-full">
                  </input>
                </label>
              </li>
              <li className='flex flex-col gap-2 mt-4'>
                <label htmlFor='link' className='text-sm font-bold text-primaryGreen'>
                  Link
                  <input onChange={handleChange} type="url" name="link" id="link" required minLength={5} maxLength={300} defaultValue={link} className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                    border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                    font-normal not-italic w-full text-black">
                  </input>
                </label>
                </li>
                <li className='flex flex-col md:flex-row md:gap-4 items-center text-sm'>
                  <h4 className="text-primaryGreen font-bold">¿Es un patrocinador importante?</h4>
                  <label className='flex items-center gap-1'>
                    <p>Sí</p>
                    <input
                      type="radio"
                      name="important"
                      value="1"
                      defaultChecked={currentSponsor.important === 1 ? true : false}
                      className="my-2 h-5 mt-2 bg-background text-sm ring-offset-background 
                      file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                      border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                      placeholder:italic placeholder:text-slate-400 font-medium accent-green-600"
                    />
                  </label>
                  <label className='flex items-center gap-1'>
                    <p>No</p>
                    <input
                      type="radio"
                      name="important"
                      value="0"
                      defaultChecked={important === 0 ? true : false}
                      className="my-2 h-5 mt-2 bg-background text-sm ring-offset-background 
                      file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                      border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                      placeholder:italic placeholder:text-slate-400 font-medium self-baseline accent-green-600"
                    />
                  </label>
                </li>
                <li className='flex flex-col gap-2 border-2 p-3'>
                  <label htmlFor="logo" className="lg:self-start flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
                    <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='Editar logo'/>EDITAR
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
              <li className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
                <button type="submit" className='self-center border-2 mt-4 w-[157px] h-[42px] border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold py-2 px-6 lg:self-end lg:mb-2
                  hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
                >
                  GUARDAR
                </button>
                <button 
                  type='button' 
                  className='flex self-center mt-2 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
                  onClick={() => setEditOpen(false)}
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
}

export default EditSponsor;