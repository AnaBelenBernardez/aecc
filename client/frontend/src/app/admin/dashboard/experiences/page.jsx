"use client"

import Loading from '../../../../components/loading/Loading';
import useGetAllExperiences from '../../../../hooks/useGetAllExperiences';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '../../../../store';
import { deleteExperienceService } from '../../../../service';
import { useState } from 'react';
import DeleteExperienceModal from '../../../../components/modals/experiences/deleteExperienceModal';
import AddExperienceModal from '../../../../components/modals/experiences/AddExperienceModal';
import EditExperienceModal from '../../../../components/modals/experiences/EditExperienceModal';
import BlockScroll from '../../../../components/blockScroll/BlockScroll';

const dashboardExperiences = () => {
const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

  const { experiences, loading, error, refetch } = useGetAllExperiences();
  const [idExperienceOpen, setIdExperienceOpen] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState();
  const [addExperienceModalOpen, setAddExperienceModalOpen] = useState();
  const [editExperienceModalOpen, setEditExperienceModalOpen] = useState();
  const [singleExperience, setSingleExperience] = useState();

  const openModalDelete = async (idExperience) => {
    setIdExperienceOpen(idExperience);
    setDeleteModalOpen(true);
  }
  
  const handleClickDelete = async () => {
    await deleteExperienceService(idExperienceOpen, token);
    refetch();
    setDeleteModalOpen(false);
  };
  
  const openModalAddExperience = async () => {
    setAddExperienceModalOpen(true);
  }

  const openModalEdit = async (notice) => {
    setSingleExperience(notice)
    setEditExperienceModalOpen(true);
  }

  if (loading) return <Loading/>;


  return (
    <main className='flex flex-col my-4 px-4 items-center'>
      <BlockScroll isModalOpen={addExperienceModalOpen || deleteModalOpen || editExperienceModalOpen} />
      <button 
        onClick={openModalAddExperience} 
        className='border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 
        mb-6 lg:mb-6 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'
      >
        AÑADIR EXPERIENCIA
      </button>
      { addExperienceModalOpen && <AddExperienceModal setAddExperienceModalOpen={setAddExperienceModalOpen} token={token} refetch={refetch}/> }
      { deleteModalOpen && <DeleteExperienceModal handleClickDelete={handleClickDelete} setDeleteModalOpen={setDeleteModalOpen} /> }
      {editExperienceModalOpen && <EditExperienceModal currentExperience={singleExperience} setEditExperienceModalOpen={setEditExperienceModalOpen} token={token} refetch={refetch}/>}
      {
        experiences.length > 0
          ? experiences.map((experienceItem) => {
            const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${experienceItem.photo}`
            return (
              <article className='flex flex-col justify-between p-8 items-center shadow-md md:flex-row lg:w-[80%]' key={experienceItem.name}>
              <div className='lg:flex lg:w-[70%] lg:justify-evenly'>
                <div className='flex gap-3 items-center'>
                  <p className='w-[52px] text-left flex items-center text-lightPink font-bold'>{experienceItem.name}</p>
                  <h2 className='font-bold px-6 line-clamp-3 w-[240px]'>{experienceItem.content}</h2>
                </div>
                {
                  experienceItem.photo !== null
                  ? <div className='min-w-36 min-h-36 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                        <Image src={imgSrc} width={150} height={150} alt='Imagen de la noticia' className='rounded-full object-cover w-36 h-36'/>
                      </div>
                    : <div className='min-w-36 min-h-36 self-center hidden lg:block lg:max-w-[150px] lg:max-h-[72px]'>
                        <Image src={'/image/userDefault.png'} width={150} height={150} alt='Imagen de la noticia' className='rounded-full object-cover w-36 h-36'/>
                      </div>
                }
              </div>
              <div className='self-end flex gap-4 md:self-center'>
                <button onClick={() => openModalEdit(experienceItem)} className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen md:mt-0'>
                  <Image src={'/icons/editIcon.svg'} width={24} height={24} alt='Icono de editar'/>
                  EDITAR
                </button>
                <button onClick={() => openModalDelete(experienceItem.id)} className='flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed md:mt-0'>
                  <Image src={'/icons/deleteIcon.svg'} width={24} height={24} alt='Icono de eliminar'/>
                  ELIMINAR
                </button>
              </div>
              </article>
            )
            })
          : <div className='self-center flex flex-col lg:flex-row lg:items-center lg:gap-8'>
              <Image src={'/image/noExperiencesYet.svg'} width={300} height={300} alt='Experiencias'/>
              <p className='mt-2 font-bold text-center'>Todavía no hay experiencias</p>
            </div>
      }
    </main>
  )
};

export default dashboardExperiences;