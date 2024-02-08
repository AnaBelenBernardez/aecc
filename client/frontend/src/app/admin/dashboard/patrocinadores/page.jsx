"use client"

import useGetAllSponsors from '../../../../hooks/useGetAllSponsors';
import Image from 'next/image';
import Loading from '../../../../components/loading/Loading';
import { useEffect, useState } from 'react';
import { useLoginStore } from '../../../../store';
import { useRouter } from 'next/navigation';
import BlockScroll from '../../../../components/blockScroll/BlockScroll';
import DeleteSponsor from '../../../../components/modals/sponsors/DeleteSponsor';
import { deleteSponsorService } from '../../../../service';
import AddSponsor from '../../../../components/modals/sponsors/AddSponsor';


const SponsorAdminPage = () => {
	const { sponsors, loading, error } = useGetAllSponsors();
	const [clickedEdit, setClickedEdit] = useState(false);
	const [sponsorsList, setSponsorsList] = useState([]);
	const [sponsorId, setSponsorId] = useState();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [clickedAdd, setClickedAdd] = useState(false);

	const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

	useEffect(() =>{
    if(sponsors !== undefined){
      setSponsorsList(sponsors);
    }
	},[sponsors]);

	if (loading) return <Loading/>;

	function handleClickEdit(id){
		setClickedEdit(true);
		setSponsorId(id);
	}

	function openModalDelete(sponsorId){
    setSponsorId(sponsorId);
    setDeleteModalOpen(true);
  }

	function handleClickAdd(){
    setClickedAdd(true);
  }

	const handleClickDelete = async () => {
    await deleteSponsorService(sponsorId, token)

		const findSponsor = sponsorsList.find((sponsor) => sponsor.id === parseInt(sponsorId));
		const indexEditedSponsor = sponsorsList.indexOf(findSponsor);
		const newSponsorsList = [...sponsorsList];
		newSponsorsList.splice(indexEditedSponsor, 1);

    setSponsorsList(newSponsorsList);
    setDeleteModalOpen(false);
  };

	return (
	<main className="mx-10 my-10 flex flex-col gap-4 items-center">
		<BlockScroll isModalOpen={clickedAdd || deleteModalOpen || clickedEdit}/>
		<h1 className="text-4xl sm:text-5xl text-primaryGreen font-bold">
			Gestión de patrocinios
		</h1>
		<div className='flex p-3 justify-center'>
				<button onClick={handleClickAdd} className='border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>
					AÑADIR PATROCINADOR
				</button>
		</div>
		<ol className='flex flex-col gap-5'>
    {deleteModalOpen && <DeleteSponsor handleClickDelete={handleClickDelete} setDeleteModalOpen={setDeleteModalOpen} /> }
    {clickedAdd && <AddSponsor setClickedAdd={setClickedAdd} sponsorsList={sponsorsList} setSponsorsList={setSponsorsList} token={token}/> }
		{
			sponsorsList.length > 0 ? 
			sponsorsList.map((sponsor) => {
        const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${sponsor.logo}`;
					return (
							<li key={sponsor.id} className='flex flex-col justify-between p-4 items-center shadow-md md:flex-row'>
								{
									clickedEdit && sponsorId === sponsor.id ?
                  <p>editar</p>
									:
										<article className="lg:w-[100%] flex flex-col justify-items-center">
                      <section className="flex flex-col justify-items-center w-[85vw]">
                        <Image src={imgSrc} width={150} height={150} alt='Logo del patrocinador' className='rounded object-contain w-300 h-36 self-center'/>
                        <h3 className="text-primaryGreen font-semibold text-l text-justify">{sponsor.name}</h3>
                        <p className="line-clamp-3">{sponsor.description}</p>
                      </section>
											<div className='self-end flex gap-4 justify-end lg:w-[100%]'>
												<button onClick={()=>handleClickEdit(sponsor.id)} className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen'><Image src="/icons/editIcon.svg" width={24} height={24} alt="Editar"></Image>EDITAR</button>
												<button onClick={() => openModalDelete(sponsor.id)}className='flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed'><Image src="/icons/deleteIcon.svg" width={24} height={24} alt="Eliminar"></Image>ELIMINAR</button>
											</div>
										</article>
								}
							</li>
					)
				})
			: 
				<>
          <div className='flex flex-col md:flex-row md:justify-center md:items-center'>
            <Image src={'/image/noFaqsYet.svg'} width={300} height={300} alt='Todavía no hay patrocinadores' className='mb-6 md:mb-0'/>
            <p className='text-balance md:pl-10 lg:w-1/2'>Actualmente no hay patrocinadores en la web. Añade nuevos patrocinadores para mostrar su apoyo a la asociación.</p>
          </div>
				</>
		}
		</ol>
	</main>
	);
};

export default SponsorAdminPage;