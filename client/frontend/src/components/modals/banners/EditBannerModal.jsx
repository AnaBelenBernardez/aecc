import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Toaster } from "@/components/ui/toaster";

const EditBannerModal = ({ currentBanner, setEditBannerModalOpen, handleSubmitEdit, setFormValuesEdit, formValuesEdit }) => {
  const [newPhoto, setNewPhoto] = useState();
  const [image, setImage] = useState();
  const [externalLink, setExternalLink] = useState(currentBanner.button_link?.includes('https') ? true : false);

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
    const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentBanner.photo}`;
    const img = await urlToFile(imgSrc, 'photo');
    setImage(img);
    setFormValuesEdit({
      ...formValuesEdit,
      photo: image
    });
  };
  const previousImg = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${currentBanner.photo}`;

  const handleChange = (e) => {
    const newFormValuesEdit = e.target.value;
    if (newFormValuesEdit === "") {
      setExternalLink(true);
    }

    setFormValuesEdit({
      ...formValuesEdit,
      [e.target.name]: newFormValuesEdit
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setNewPhoto(URL.createObjectURL(e.target.files[0]));
      setFormValuesEdit({
        ...formValuesEdit,
        [e.target.name]: [e.target.files]
      });
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[70vw] lg:p-12'>
        <button onClick={() => setEditBannerModalOpen(false)} className="absolute top-5 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
          <img src="/icons/closeModals.svg" alt='Icono de cerrar' />
        </button>
        <form className='flex flex-col gap-2 overflow-auto' onSubmit={handleSubmitEdit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Formulario en castellano</h2>
          <label htmlFor="title" className='font-bold text-sm'>
            Título
            <input
              type="text"
              id='title' name='title'
              className='flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium'
              defaultValue={currentBanner.title !== null && currentBanner.title !== "null" ? currentBanner.title : ""}
              onChange={handleChange} minLength={2} maxLength={300}
              required={formValuesEdit.galician_title !== null && formValuesEdit.galician_title !== "null" && formValuesEdit.galician_title !== "" ? true : false}
              placeholder='Escriba aquí el título'
              />
          </label>
          <label htmlFor="subtitle" className='font-bold text-sm'>
            Subtítulo
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='subtitle' name='subtitle'
              defaultValue={currentBanner.subtitle !== null && currentBanner.subtitle !== "null" ? currentBanner.subtitle : ""}
              onChange={handleChange}
              minLength={2} maxLength={1500}
              required={formValuesEdit.galician_subtitle !== null && formValuesEdit.galician_subtitle !=="null" && formValuesEdit.galician_subtitle !== "" ? true : false}
              placeholder='Escriba aquí el subtítulo'
            />
          </label>
          <label htmlFor="button_link" className='font-bold text-sm'>
            Link

          <select
                id="button_link"
                className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
                placeholder:italic placeholder:text-slate-400 w-full font-medium"
                name="button_link" onChange={handleChange}
                defaultValue={currentBanner.button_link !== null && currentBanner.button_link !== "null" ? currentBanner.button_link : ""}
            >
            <option value="">Elija un enlace</option>
            <option value="/calendario-e-inscripciones" key={"/calendario-e-inscripciones"}>
              Calendario e inscripciones
            </option>
              <option value={"/en-marcha"} key={"/en-marcha"}>
              A Coruña en Marcha
            </option>
              <option value={"/galeria"} key={"/galeria"}>
              Galería
            </option>
              <option value={"/faq"} key={"/faq"}>
              FAQS
            </option>
              <option value={"/voluntarios"} key={"/voluntarios"}>
              Voluntariado
            </option>
              <option value={"/patrocinios"} key={"/patrocinios"}>
              Patrocinadores
            </option>
              <option value={"/noticias"} key={"/noticias"}>
              Noticias
            </option>
              <option value={"/contacto"} key={"/contacto"}>
              Contacto
            </option>
              <option value="" key="external_link">
              Enlace externo
            </option>
            </select>
            { externalLink && 
              <input
              placeholder='Escriba aquí la URL (https://www...)'
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='button_link' name='button_link'
              onChange={handleChange}
              defaultValue={currentBanner.button_link !== null && currentBanner.button_link !== "null"  && currentBanner.button_link[0] !== "/" ? currentBanner.button_link : ""}
            />
            }
          </label>
          <label htmlFor="button_text" className='font-bold text-sm'>
            Texto del botón
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='button_text' name='button_text'
              defaultValue={currentBanner.button_text !== null && currentBanner.button_text !== "null" ? currentBanner.button_text : ""}
              onChange={handleChange}
              required={formValuesEdit.galician_button_text !== null && formValuesEdit.galician_button_text !== "null" && formValuesEdit.galician_button_text !== "" ? true : false}
              placeholder='Escriba aquí el texto del botón'
            />
          </label>
          <div className='flex flex-col-reverse justify-end gap-6 mt-4 self-center'>
            <label htmlFor="photo" className="lg:self-center flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
              <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />EDITAR FOTO
              <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                id="photo" type="file" name='photo' onChange={handleChangeImage}
              />
            </label>
            {
              newPhoto
                ? <div className='h-[50px] w-[200px] lg:h-[200px] lg:w-[800px]'>
                  <Image src={newPhoto} width={400} height={100} alt='Fotos del banner' className='h-[50px] w-[200px] lg:h-[200px] lg:w-[800px] object-cover' />
                </div>
                : <div className='h-[50px] w-[200px] lg:h-[200px] lg:w-[800px]'>
                  <Image src={currentBanner.photo !== null ? previousImg : '/image/newsDefault.png'} width={400} height={100} alt='Fotos del banner' className='h-[50px] w-[200px] lg:h-[200px] lg:w-[800px] object-cover' />
                </div>
            }
          </div>
          <h2 className='font-bold text-lg mt-6 text-primaryGreen'>Formulario en gallego</h2>
          <label htmlFor="galician_title" className='font-bold text-sm'>
            Título
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_title' name='galician_title'
              defaultValue={currentBanner.galician_title !== null && currentBanner.galician_title !== "null" ? currentBanner.galician_title : ""} onChange={handleChange}
              minLength={2} maxLength={300}
              required={formValuesEdit.title !== null && formValuesEdit.title !== "null" && formValuesEdit.title !== "" ? true : false}
              placeholder='Escriba aquí o título'
            />
          </label>
          <label htmlFor="galician_subtitle" className='font-bold mt-4 text-sm'>
            Subtítulo
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_subtitle' name='galician_subtitle'
              defaultValue={currentBanner.galician_subtitle !== null && currentBanner.galician_subtitle !== "null" ? currentBanner.galician_subtitle : ""} onChange={handleChange}
              minLength={2} maxLength={1500}
              required={formValuesEdit.subtitle !== null && formValuesEdit.subtitle !== "null" && formValuesEdit.subtitle !== "" ? true : false}
              placeholder='Escriba aquí o subtítulo'
            />
          </label>
          <label htmlFor="galician_button_text" className='font-bold text-sm'>
            Texto del botón
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_button_text' name='galician_button_text'
              defaultValue={currentBanner.galician_button_text !== null && currentBanner.galician_button_text !== "null" ? currentBanner.galician_button_text : ""} onChange={handleChange}
              required={formValuesEdit.button_text !== null && formValuesEdit.button_text !== "null" && formValuesEdit.button_text !== "" ? true : false}
              placeholder='Escriba aquí o texto do botón'
            />
          </label>
          <div className='flex flex-col items-center lg:flex-row lg:gap-4 lg:self-end lg:mb-2 lg:mr-2'>
            <button
              type='submit'
              className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              GUARDAR CAMBIOS
            </button>
            <button type='button' className='flex self-center mt-2 mb-4 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray lg:mb-0'
              onClick={() => setEditBannerModalOpen(false)}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default EditBannerModal;
