"use client"

import useGetAllFaqs from '../../../../hooks/useGetAllFaqs';
import Image from 'next/image';
import Loading from '../../../../components/loading/Loading';
import { useEffect, useState } from 'react';
import EditFaq from '../../../../components/modals/faqs/EditFaq';
import DeleteFaq from '../../../../components/modals/faqs/DeleteFaq';
import AddFaq from '../../../../components/modals/faqs/AddFaq';
import { useLoginStore } from '../../../../store';
import { useRouter } from 'next/navigation';
import { deleteFaqService } from '../../../../service';


const FaqAdminPage = () => {
	const { faqs, loading, error } = useGetAllFaqs();
	const [clickedEdit, setClickedEdit] = useState(false);
	const [faqsList, setFaqsList] = useState([]);
	const [faqId, setFaqId] = useState();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [clickedAdd, setClickedAdd] = useState(false);

	const router = useRouter();
  const token = useLoginStore((state) => state.token);
  if (!token) {
    router.push("/admin");
  }

	useEffect(() =>{
		setFaqsList(faqs);
	},[faqs])

	if (loading) return <Loading/>;

	function handleClickEdit(id){
		setClickedEdit(true);
		setFaqId(id);
	}

	function openModalDelete(faqId){
    setFaqId(faqId);
    setDeleteModalOpen(true);
  }

	function handleClickAdd(){
    setClickedAdd(true);
  }

	const handleClickDelete = async () => {
    await deleteFaqService(faqId, token);
		
		const findFaq = faqsList.find((faq) => faq.id === parseInt(faqId));
		const indexEditedFaq = faqsList.indexOf(findFaq);
		const newFaqsList = [...faqsList];
		newFaqsList.splice(indexEditedFaq, 1);

    setFaqsList(newFaqsList);
    setDeleteModalOpen(false);
  };

	return (
	<main className="mx-10 my-10 flex flex-col gap-3">
		<h1 className="text-4xl sm:text-5xl text-primaryGreen font-bold self-center">
			Gestión de preguntas frecuentes (FAQs)
		</h1>
		<div className='flex p-4 justify-center'>
				<button onClick={handleClickAdd} className='border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>
					AÑADIR FAQ
				</button>
		</div>
		<ol className='flex flex-col gap-5'>
		{deleteModalOpen && <DeleteFaq handleClickDelete={handleClickDelete} setDeleteModalOpen={setDeleteModalOpen} /> }
		{clickedAdd && <AddFaq setClickedAdd={setClickedAdd} faqsList={faqsList} setFaqsList={setFaqsList} token={token}/> }
		{
			faqsList.length > 0 ? 
			faqsList.map((faq) => {
					return (
							<li key={faq.id} className='flex flex-col justify-between p-8 items-center shadow-md md:flex-row'>
								{
									clickedEdit && faqId === faq.id ?
										<EditFaq currentFaq={faq} faqsList={faqsList} setFaqsList={setFaqsList} faqId={faqId} setClickedEdit={setClickedEdit} token={token}/>
									:
										<article className="lg:w-[100%]">
											<div>
												<span className="text-primaryGreen font-semibold text-xl uppercase text-justify">{faq.question}</span>
												<p className='pt-4 text-justify'>{faq.answer}</p>
											</div>
											<div className='self-end flex gap-4 justify-end lg:w-[100%]'>
												<button onClick={()=>handleClickEdit(faq.id)} className='flex gap-4 items-center justify-center border border-primaryGreen py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-primaryGreen'><Image src="/icons/editIcon.svg" width={24} height={24} alt="Editar"></Image>EDITAR</button>
												<button onClick={() => openModalDelete(faq.id)}className='flex gap-4 items-center justify-center border border-secondRed py-2 px-6 mt-4 rounded-3xl font-bold text-sm text-secondRed'><Image src="/icons/deleteIcon.svg" width={24} height={24} alt="Eliminar"></Image>ELIMINAR</button>
											</div>
										</article>
								}
							</li>
					)
				})
			: 
				<>
					<div className='flex flex-col md:flex-row md:justify-center md:items-center'>
					<Image src={'/image/noFaqsYet.svg'} width={300} height={300} alt='Todavía no hay FAQs' className='mb-6 md:mb-0'/>
					<p className='text-balance md:pl-10 lg:w-1/2'>Actualmente no hay preguntas frecuentes en la web. Añade nuevas FAQs para ayudar a los usuarios.</p>
					</div>
				</>
		}
		</ol>
	</main>
	);
};

export default FaqAdminPage;