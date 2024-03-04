import Image from 'next/image';

const AddPhotoModal = ({ setAddModalOpen, handleSubmit, photo, setPhoto }) => {

  const handleChangeImage = async (e) => {
    e.preventDefault();
    setPhoto(e.target.files);
  }

  function handleCancel(){
    setAddModalOpen(false);
    setPhoto("");
  } 

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[2]'>
      <div className='relative w-[90vw] max-h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
      <button onClick={handleCancel} className="absolute top-6 right-7 md:top-6 md:right-7 hover:cursor-pointer hover:scale-125 duration-300">
              <img src="/icons/closeModals.svg" alt='Icono de cerrar'/>
            </button>
        <form className='flex flex-col gap-2 overflow-auto h-full' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Añadir foto/s</h2>
          <label htmlFor="photo" className="lg:self-start flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
            <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />AÑADIR
            <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
            id="photo" type="file" name='photo' multiple
            onChange={handleChangeImage}
            />
          </label>
          {
            photo
              ? <div className='flex gap-3 flex-wrap justify-center my-4'>
               { 
                  Array.from(photo).map((image, index) => {
                    return (
                      <div className='h-40 w-40' key={index}>
                        <Image src={URL.createObjectURL(image)} width={150} height={150} alt='Fotos del evento' className='h-40 w-40 object-cover'/>
                      </div>
                    )
                  })
                }
              </div>         
              : null
          }
          <div className='flex flex-col items-center mb-2 lg:flex-row lg:self-end lg:gap-4'>
            <button
              type='submit'
              className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-0
              hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              AÑADIR FOTO/S
            </button>
            <button
              type='button'
              className='flex self-center mt-2 gap-4 w-[157px] h-[40px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
              onClick={handleCancel}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddPhotoModal;