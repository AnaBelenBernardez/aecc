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
import Link from "next/link";
import EditSponsor from '../../../../components/modals/sponsors/EditSponsor';
import { useToast } from '../../../../components/ui/use-toast';
import { Toaster } from '../../../../components/ui/toaster';

const SponsorAdminPage = () => {
	const { sponsors, loading, error } = useGetAllSponsors();
	const [clickedEdit, setClickedEdit] = useState(false);
	const [sponsorsList, setSponsorsList] = useState([]);
	const [sponsorId, setSponsorId] = useState();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [clickedAdd, setClickedAdd] = useState(false);
	const [addSuccess, setAddSuccess] = useState(false);
	const [addReject, setAddReject] = useState(false);
	const [editSuccess, setEditSuccess] = useState(false);
	const [editReject, setEditReject] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [deleteReject, setDeleteReject] = useState(false);
	const [searchSuccess, setSearchSuccess] = useState(false);
	const { toast } = useToast();

	const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

	useEffect(() =>{
    if(sponsors !== undefined){
      const sortedByImportance = [];

      sponsors.map((sponsor) => {
        sponsor.important === 1 ? sortedByImportance.unshift(sponsor) : sortedByImportance.push(sponsor);
      })

      setSponsorsList(sortedByImportance);
    }
	},[sponsors]);

	useEffect(() =>{
		if(addSuccess){
			toast({
				variant: "success",
				title: "Se ha añadido un nuevo patrocinador correctamente.",
				className: "bg-primaryGreen text-white text-lg font-bold",
			});

			setAddSuccess(false);
		}

		if(addReject){
			toast({
        variant: "destructive",
        title: "Ha ocurrido un problema al añadir el nuevo patrocinador.",
        className: "bg-secondRed text-white text-lg font-bold",
      });

			setAddReject(false);
		}

		if(editSuccess){
			toast({
				variant: "success",
				title: "Patrocinador editado correctamente.",
				className: "bg-primaryGreen text-white text-lg font-bold",
			});

			setEditSuccess(false);
		}

		if(editReject){
			toast({
				variant: "destructive",
				title: "Ha ocurrido un problema al editar el patrocinador.",
				className: "bg-secondRed text-white text-lg font-bold",
			});

			setEditReject(false);
		}

		if(deleteSuccess){
			toast({
				variant: "succes",
				title: "Patrocinador eliminado correctamente.",
				className: "bg-primaryGreen text-white text-lg font-bold"
			})

			setDeleteSuccess(false);
		}

		if(deleteReject){
			toast({
				variant: "destructive",
				title: "Ha ocurrido un problema al eliminar el patrocinador.",
				className: "bg-secondRed text-white text-lg font-bold",
			});

			setDeleteReject(false);
		}

	},[addSuccess, addReject, editSuccess, editReject, deleteSuccess, deleteReject]);

	if (loading) return <Loading/>;

	function handleClickEdit(sponsor){
		setClickedEdit(true);
		setSponsorId(sponsor.id);
	}

	function openModalDelete(sponsorId){
    setSponsorId(sponsorId);
    setDeleteModalOpen(true);
  }

	function handleClickAdd(){
    setClickedAdd(true);
  }

	function handleChange(e){
    const value = e.target.value;
		let findSponsor = sponsorsList.find((sponsor) => sponsor.name.toLowerCase().startsWith(value.toLowerCase()));

		if(value?.length === 0){
			findSponsor = false;
			setSearchSuccess(false);
		}

		if(findSponsor){
			setSearchSuccess(findSponsor);
		}else{
			setSearchSuccess(false);
		}

	}

	const handleClickDelete = async () => {
		try{
			await deleteSponsorService(sponsorId, token);
			setDeleteSuccess(true);
		}catch(e){
			setDeleteReject(true);
		}finally{
			if(!deleteReject){
				const findSponsor = sponsorsList.find((sponsor) => sponsor.id === parseInt(sponsorId));
				const indexEditedSponsor = sponsorsList.indexOf(findSponsor);
				const newSponsorsList = [...sponsorsList];
				newSponsorsList.splice(indexEditedSponsor, 1);

				setSponsorsList(newSponsorsList);
				setDeleteModalOpen(false);
				setSearchSuccess(false);
			}
		}
  };

	return (
		<>
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
				<section className='w-[90vw] md:w-[99%] lg:w-[91%] mb-8'>
					<label className="self-start w-full text-sm font-semibold">Buscador de patrocinios
						<input 
							type="text"
							name="sponsorName"
							id="sponsorName"
							onChange={handleChange}
							className="flex h-10 bg-background px-3 py-2 text-sm ring-offset-background 
							file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
							focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
							border-0 rounded-none border-b-2 border-secondGray focus-visible:ring-0 focus:border-b-green-600 
							font-normal not-italic w-full"
							placeholder='Escriba aquí el nombre del patrocinador'
						/>
					</label>
					{
						searchSuccess &&
						<div className="border-2 border-color-primaryGreen">
							<article className="lg:w-[100%] p-5 flex flex-col justify-items-center">
								<section className="flex flex-col self-center md:justify-items-center w-[70vw] md:w-[85vw] lg:w-[80vw]">
									<div className="flex flex-col items-center gap-3 mb-4">
										<Image src={process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${searchSuccess.logo}`} width={200} height={150} alt='Logo del patrocinador' className='rounded object-contain w-300 h-36 self-center'/>
										{searchSuccess.link && <Link href={searchSuccess.link} target='_blank' className='text-xs border-2 border-primaryGreen text-primaryBlack font-medium rounded-3xl px-5 py-2'>{searchSuccess.link}</Link>}
									</div>
									<div className='flex items-center gap-1'>
										{
											searchSuccess.important === 1 &&
											<Image src="/icons/importantIcon.svg" width={32} height={32} alt="Patrocinador importante"/>
										}
										<h3 className="text-primaryGreen font-semibold text-l text-justify self-end">{searchSuccess.name}</h3>
									</div>
									<p className="line-clamp-3">{searchSuccess.description}</p>
								</section>
								<section className=' self-center md:self-end flex gap-2 md:gap-4 lg:justify-end lg:w-[100%]'>
									<button onClick={()=>handleClickEdit(searchSuccess)} className='flex gap-2 md:gap-4 items-center justify-center border border-primaryGreen py-1 px-4 md:py-2 md:px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen'><Image src="/icons/editIcon.svg" width={24} height={24} alt="Editar"></Image>EDITAR</button>
									<button onClick={() => openModalDelete(searchSuccess.id)}className='flex gap-2 md:gap-4 items-center justify-center border border-secondRed py-1 px-4 md:py-2 md:px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed'><Image src="/icons/deleteIcon.svg" width={24} height={24} alt="Eliminar"></Image>ELIMINAR</button>
								</section>
							</article>
						</div>
					}
				</section>
				
				
				<ol className='flex flex-col gap-5'>
				{deleteModalOpen && <DeleteSponsor handleClickDelete={handleClickDelete} setDeleteModalOpen={setDeleteModalOpen} /> }
				{clickedAdd && <AddSponsor setClickedAdd={setClickedAdd} sponsorsList={sponsorsList} setSponsorsList={setSponsorsList} setAddSucces={setAddSuccess} setAddReject={setAddReject} token={token}/> }
				{
					sponsorsList?.length > 0 ? 
					sponsorsList.map((sponsor) => {
						const imgSrc = process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${sponsor.logo}`;
							return (
									<li key={sponsor.id} className='flex flex-col justify-between p-4 items-center shadow-md md:flex-row'>
										{
											clickedEdit && sponsorId === sponsor.id ?
											<EditSponsor currentSponsor={sponsor} sponsorsList={sponsorsList} setSponsorsList={setSponsorsList} sponsorId={sponsorId} 
												setClickedEdit={setClickedEdit} setEditSuccess={setEditSuccess} setEditReject={setEditReject} setSearchSuccess={setSearchSuccess} token={token}/>
											:
												<article className="lg:w-[100%] flex flex-col justify-items-center">
													<section className="flex flex-col justify-items-center w-[85vw]">
														<div className="flex flex-col items-center gap-3 mb-4">
															<Image src={imgSrc} width={200} height={150} alt='Logo del patrocinador' className='rounded object-contain w-300 h-36 self-center'/>
															{sponsor.link && <Link href={sponsor.link} target='_blank' className='text-xs border-2 border-primaryGreen text-primaryBlack font-medium rounded-3xl px-5 py-2'>{sponsor.link}</Link>}
														</div>
														<div className='flex items-center gap-1'>
															{
																sponsor.important === 1 &&
																<Image src="/icons/importantIcon.svg" width={32} height={32} alt="Patrocinador importante"/>
															}
															<h3 className="text-primaryGreen font-semibold text-l text-justify self-end">{sponsor.name}</h3>
														</div>
														<p className="line-clamp-3">{sponsor.description}</p>
													</section>
													<section className='self-end flex gap-4 justify-end lg:w-[100%]'>
														<button onClick={()=>handleClickEdit(sponsor)} className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen'><Image src="/icons/editIcon.svg" width={24} height={24} alt="Editar"></Image>EDITAR</button>
														<button onClick={() => openModalDelete(sponsor.id)}className='flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed'><Image src="/icons/deleteIcon.svg" width={24} height={24} alt="Eliminar"></Image>ELIMINAR</button>
													</section>
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
			<Toaster/>
		</>
	
		
	
	);
};

export default SponsorAdminPage;