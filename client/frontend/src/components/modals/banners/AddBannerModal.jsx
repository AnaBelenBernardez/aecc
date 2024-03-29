import { useEffect, useState } from 'react';
import Image from 'next/image';

const AddBannerModal = ({ setAddBannerModalOpen, formValues, setFormValues, handleSubmitAdd }) => {
  const [desktopNewPhoto, setDesktopNewPhoto] = useState();
  const [mobileNewPhoto, setMobileNewPhoto] = useState();
  const [tabletNewPhoto, setTabletNewPhoto] = useState();
  const [externalLink, setExternalLink] = useState(false);

  useEffect(() => {
    setFormValues({
      title: '',
      subtitle: '',
      button_text: '',
      button_link: '',
      galician_title: '',
      galician_subtitle: '',
      galician_button_text: '',
    })
  }, []);
  
  const handleChange = (e) => {
    const newFormValues = e.target.value;
    if (newFormValues === 'external_link') {
      setExternalLink(true);
    }
    setFormValues({
      ...formValues,
      [e.target.name]: newFormValues
    });
  };

  const handleDesktopChangeImage = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    });
    setDesktopNewPhoto(e.target.files);
  };

  const handleMobileChangeImage = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
    setMobileNewPhoto(e.target.files);
  }

  const handleTabletChangeImage = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: [e.target.files]
    })
    setTabletNewPhoto(e.target.files);
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[70vw] lg:p-12'>
        <button onClick={() => setAddBannerModalOpen(false)} className="absolute top-5 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
          <img src="/icons/closeModals.svg" alt='Icono de cerrar' />
        </button>
        <form className='flex flex-col gap-2 overflow-auto' onSubmit={handleSubmitAdd}>
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
              id='title' name='title' minLength={2} maxLength={300}
              onChange={handleChange}
              required={formValues.galician_title !== "" ? true : false}
              placeholder='Escriba aquí el título'
            />
          </label>
          <label htmlFor="content" className='font-bold text-sm'>
            Subtítulo
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='subtitle' name='subtitle' minLength={2} maxLength={300}
              onChange={handleChange}
              required={formValues.galician_subtitle !== "" ? true : false}
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
              <option value="external_link" key="external_link">
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
            />
            }
          </label>
          <label htmlFor="button_text" className='font-bold text-sm'>
            Texto del botón
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='button_text' name='button_text'
              onChange={handleChange}
              required={formValues.galician_button_text !== "" ? true : false}
              placeholder='Escriba aquí el texto del botón'
            />
          </label>
          <div className='flex flex-col-reverse justify-end gap-6 mt-4 self-center'>
            <label htmlFor="desktop_photo" className="flex gap-4 items-center justify-center lg:justify-between border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer min-w-64 md:min-w-[330px] lg:min-w-72">
              AÑADIR BANNER ESCRITORIO
              <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' className='hidden lg:block' />
              <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                id="desktop_photo" type="file" name='desktop_photo'
                onChange={handleDesktopChangeImage}
                placeholder='Escriba aquí o título'
              />
            </label>
            {
              desktopNewPhoto
                ? <div className='h-[75px] w-[300px] lg:w-[800px] lg:h-[200px]'>
                  <Image 
                  src={URL.createObjectURL(desktopNewPhoto[0])} 
                  width={150} 
                  height={72} 
                  alt='Fotos del banner para el escritorio' 
                  className='h-[75px] w-[300px] lg:w-[800px] lg:h-[200px] object-cover' />
                </div>
                : null
            }
          </div>
          <div className='flex flex-col-reverse justify-end gap-6 mt-4 self-center'>
            <label htmlFor="tablet_photo" className="flex gap-4 items-center justify-center lg:justify-between border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer min-w-64 md:min-w-[330px] lg:min-w-72">
              AÑADIR BANNER TABLET
              <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' className='hidden lg:block' />
              <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                id="tablet_photo" type="file" name='tablet_photo'
                onChange={handleTabletChangeImage}
                placeholder='Escriba aquí o título'
              />
            </label>
            {
              tabletNewPhoto
                ? <div className='w-[100px] h-[75px] lg:h-[200px] lg:w-[300px] self-center'>
                  <Image 
                  src={URL.createObjectURL(tabletNewPhoto[0])} 
                  width={150} 
                  height={72} 
                  alt='Fotos del banner para tablet' 
                  className='w-[100px] h-[75px] lg:h-[200px] lg:w-[300px] object-cover' />
                </div>
                : null
            }
          </div>
          <div className='flex flex-col-reverse justify-end gap-6 mt-4 self-center'>
            <label htmlFor="mobile_photo" className="flex gap-4 items-center justify-center lg:justify-between border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer min-w-64 md:min-w-[330px] lg:min-w-72">
              AÑADIR BANNER MÓVIL
              <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' className='hidden lg:block' />
              <input className="hidden w-full lg:w-52 cursor-pointer mt-2 text-sm font-medium"
                id="mobile_photo" type="file" name='mobile_photo'
                onChange={handleMobileChangeImage}
                placeholder='Escriba aquí o título'
              />
            </label>
            {
              mobileNewPhoto
                ? <div className='w-[75px] h-[75px] lg:h-[200px] lg:w-[200px] self-center'>
                  <Image 
                  src={URL.createObjectURL(mobileNewPhoto[0])} 
                  width={150} 
                  height={72} 
                  alt='Fotos de la noticia' 
                  className='w-[75px] h-[75px] lg:h-[200px] lg:w-[200px] object-cover' />
                </div>
                : null
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
              id='galician_title' name='galician_title' minLength={2} maxLength={300}
              required={formValues.title !== "" ? true : false}
              onChange={handleChange}
              placeholder='Escriba aquí o título'
            />
          </label>
          <label htmlFor="galician_subtitle" className='font-bold mt-4 text-sm'>
            Subtítulo
            <textarea
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
              placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_subtitle' name='galician_subtitle' minLength={2} maxLength={1500}
              required={formValues.subtitle !== "" ? true : false}
              onChange={handleChange}
              placeholder='Escriba aquí o subtítulo'
            />
          </label>
          <label htmlFor="galician_button_text" className='font-bold text-sm'>
            Texto del botón
            <input
              type="text"
              className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 placeholder:italic placeholder:text-slate-400 w-full font-medium"
              id='galician_button_text' name='galician_button_text'
              required={formValues.button_text !== "" ? true : false}
              onChange={handleChange} minLength={2} maxLength={1500}
              placeholder='Escriba aquí o texto do botón'
            />
          </label>
          
          <div className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4 lg:mr-2'>
            <button
              type='submit'
              className='self-center lg:mb-2 border-2 mt-2 lg:mt-0 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end
              hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              AÑADIR BANNER
            </button>
            <button
              type='button'
              className='flex self-center lg:mb-2 mt-2 lg:mt-0 gap-4 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
              onClick={() => setAddBannerModalOpen(false)}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerModal;

