"use client"

import Loading from '../../../../components/loading/Loading';
import useGetAllNews from '../../../../hooks/useGetAllNews';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '../../../../store';
import { deleteNewService } from '../../../../service';
import { useState } from 'react';
import DeleteNewModal from '../../../../components/modals/news/deleteNewModal';
import AddNewModal from '../../../../components/modals/news/AddNewModal';

const dashboardNews = () => {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

  const { news, loading, error, refetch } = useGetAllNews();
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const [idNewOpen, setIdNewOpen] = useState();
  const [addNewModalOpen, setAddNewModalOpen] = useState();

  const openModalDelete = async (idNew) => {
    setIdNewOpen(idNew);
    setDeleteModalOpen(true);
  }

  const handleClickDelete = async () => {
    await deleteNewService(idNewOpen, token);
    refetch();
    setDeleteModalOpen(false);
  };

  const openModalAddNew = async () => {
    setAddNewModalOpen(true);
  }

  if (loading) return <Loading/>;

  return (
    <main className='flex flex-col my-4 px-4'>
      <button onClick={openModalAddNew} className='self-end border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>
        AÑADIR NOTICIA
      </button>
      { addNewModalOpen && <AddNewModal setAddNewModalOpen={setAddNewModalOpen} token={token}/> }
      { deleteModalOpen && <DeleteNewModal handleClickDelete={handleClickDelete} setDeleteModalOpen={setDeleteModalOpen} /> }
      {
        news.length > 0
          ? news.map((newItem) => {
            const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${newItem.photo}`
            return (
              <article className='flex flex-col justify-between p-8 items-center shadow-md' key={newItem.title}>
              <div>
                <div className='flex items-center'>
                  <p className='w-[52px] text-center flex items-center text-lightPink font-bold'>{new Date(newItem.news_date || newItem.create_date).toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' }).toLocaleUpperCase()}</p>
                  <h2 className='font-bold px-6 line-clamp-2 w-[240px]'>{newItem.title}</h2>
                </div>
                {
                  newItem.photo !== null
                    ? <div className='self-center hidden lg:block'>
                        <Image src={imgSrc} width={150} height={150} alt='Imagen de la noticia'/>
                      </div>
                    : <div className='self-center hidden lg:block'>
                        <Image src={'/image/newsDefault.png'} width={150} height={150} alt='Imagen de la noticia'/>
                      </div>
                }
              </div>
              <div className='self-end flex gap-4'>
                <button className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen'>
                  <Image src={'/icons/editIcon.svg'} width={24} height={24} alt='Icono de editar'/>
                  EDITAR
                </button>
                <button onClick={() => openModalDelete(newItem.id)} className='flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed'>
                  <Image src={'/icons/deleteIcon.svg'} width={24} height={24} alt='Icono de eliminar'/>
                  ELIMINAR
                </button>
              </div>
              </article>
            )
            })
          : <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
              <Image src={'/image/noNewsYet.svg'} width={300} height={300} alt='Noticias'/>
              <p className='mt-2 font-bold text-center'>Todavía no hay noticias</p>
            </div>
      }
    </main>
  )
};

export default dashboardNews;