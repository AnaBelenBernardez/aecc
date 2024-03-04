"use client"

import Loading from '../../../../../components/loading/Loading';
import useGetEvent from '../../../../../hooks/useGetEvent';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLoginStore } from '../../../../../store';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import BlockScroll from '../../../../../components/blockScroll/BlockScroll';
import DeletePhotoModal from '../../../../../components/modals/gallery/DeletePhotoModal';
import AddPhotoModal from '../../../../../components/modals/gallery/AddPhotoModal';
import { addPhotoEventService, deletePhotoEventService } from '../../../../../service';
import { useToast } from '../../../../../components/ui/use-toast';
import { Toaster } from '../../../../../components/ui/toaster';

const EditEventPhotos = () => {
  const {id} = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

  const { event, loading, refetch } = useGetEvent(id);
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const [addModalOpen, setAddModalOpen] = useState();
  const [idPhotoOpen, setIdPhotoOpen] = useState();
  const [photo, setPhoto] = useState();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPhotoEventService(token, id, photo);
      refetch();
      setAddModalOpen(false);
      toast({
        variant: "succes",
        title: "Foto/s añadida/s correctamente",
        className: "bg-primaryGreen text-white text-lg font-bold"
      })
      setPhoto(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        className: "bg-secondRed text-white text-lg font-bold"
      })
    }
  }

  const handleClickDelete = async (idPhoto) => {
    await deletePhotoEventService(token, id, idPhoto);
    refetch();
    setDeleteModalOpen(false);
    toast({
      variant: "succes",
      title: "Foto eliminada correctamente",
      className: "bg-primaryGreen text-white text-lg font-bold"
    })
  };

  const openModalDelete = async (e, idPhoto) => {
    e.preventDefault();
    setIdPhotoOpen(idPhoto);
    setDeleteModalOpen(true);
  }

  const openModalAdd = async () => {
    setAddModalOpen(true);
  }

  if (loading) return <Loading/>;

  return (
    <>
      <main className='my-4 flex flex-col'>
        <BlockScroll
          isModalOpen={deleteModalOpen || addModalOpen}
        />
        {
          event 
            ? <>
                <button
                  onClick={openModalAdd}
                  className='self-center border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 my-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>
                  AÑADIR FOTO
                </button>
                {
                  addModalOpen && (
                    <AddPhotoModal
                      setAddModalOpen={setAddModalOpen}
                      handleSubmit={handleSubmit}
                      photo={photo}
                      setPhoto={setPhoto}
                    />
                  )
                }
                {
                  deleteModalOpen && (
                    <DeletePhotoModal
                      setDeleteModalOpen={setDeleteModalOpen}
                      idPhoto={idPhotoOpen}
                      handleClickDelete={handleClickDelete}
                    />)
                }
                <div className="flex flex-col lg:grid lg:auto-rows-[240px] lg:grid-cols-4 gap-4 mx-20">
                {event.event_photos.map((photo, i) => {
                  const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${photo.photo}`
                  return (
                    <div
                      key={i}
                      className={`row-span-1 
                      ${i===2||i===5||i===8||i===16||i===20||i===26||i===30||i===33||i===40||i===46||i===50||i===56||i===60||i===63||i===70||i===76||i===80
                        ||i===86||i===90||i===96||i===100||i===106||i===110||i===113||i===120||i===126||i===130||i===136||i===140||i===146||i===150||i===156
                        ||i===160||i===163||i===170||i===176||i===180||i===186||i===190||i===196||i===200||i===206||i===210||i===216||i===220||i===226||i===230
                        ||i===233||i===240||i===246||i===250||i===256||i===260||i===266||i===270||i===273||i===280||i===286||i===290||i===296||i===300||i===306
                        ||i===310||i===313||i===320||i===326||i===330||i===336||i===340||i===346||i===350||i===356||i===360||i===363||i===370||i===376||i===380
                        ||i===386||i===390||i===396||i === 398 || i=== 400 ? "col-span-2 row-span-2" : ""}`}
                    >
                      <Link href={imgSrc} target='_blank' className='relative'>
                        <button
                          onClick={(e) => openModalDelete(e, photo.id)}  
                          className='absolute z-[1] right-2 top-2 bg-secondRed rounded-full p-2'><Image src={'/icons/deletePhotoIcon.svg'} width={20} height={20} alt='Icono eliminar'/></button>
                        <img src={imgSrc} className='w-full h-full object-cover grayscale transition-all ease-in-out duration-1000 rounded-xl' alt='Foto del evento'/>
                      </Link>
                    </div>
                  )
                  })}
                </div>
              </>
            : null
        }
      </main>
      <Toaster/>
    </>
  )
};

export default EditEventPhotos;