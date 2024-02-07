import { addPhotoEventService } from '../../../service';
import Image from 'next/image';
import { useState } from 'react';

const AddPhotoModal = ({ token, idEvent, setAddModalOpen, refetch }) => {
  const [photo, setPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPhotoEventService(token, idEvent, photo);
      refetch();
      setAddModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleChangeImage = (e) => {
    e.preventDefault();
    setPhoto(e.target.files);
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='w-[90vw] h-[90vh] bg-secondLightGray p-4 rounded-xl shadow-xl flex flex-col justify-center lg:w-[60vw] lg:p-12'>
        <form className='flex flex-col gap-2 overflow-scroll' onSubmit={handleSubmit}>
          <h2 className='font-bold text-lg text-primaryGreen'>Añadir foto/s</h2>
          <label htmlFor="photo" className="lg:self-start flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0 md:mb-2 lg:mb-0 self-center cursor-pointer">
            <Image src={"/icons/addPhotoIcon.svg"} width={24} height={24} alt='añadir imagen' />AÑADIR
            <input className="hidden w-full cursor-pointer mt-2 text-sm font-medium" 
            id="photo" type="file" name='photo' multiple
            onChange={handleChangeImage}
            />
          </label>
          <div className='flex flex-col items-center lg:flex-row lg:self-end lg:gap-4'>
            <button
              type='submit'
              className='self-center border-2 mt-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 lg:self-end lg:mb-2
              hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
            >
              AÑADIR FOTO/S
            </button>
            <button
              type='button'
              className='flex self-center mt-2 gap-4 w-[157px] h-[42px] items-center justify-center border border-secondRed bg-secondRed py-2 px-6 rounded-3xl font-bold text-sm text-secondLightGray'
              onClick={() => setAddModalOpen(false)}
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