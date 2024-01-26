"use client"

import useGetAllFaqs from '../../../../hooks/useGetAllFaqs';
import Image from 'next/image';
import Loading from '../../../../components/loading/Loading';
import { useEffect, useState } from 'react';
import EditFaq from '../../../../components/modals/faqs/EditFaq';


const FaqAdminPage = () => {
	const { faqs, loading, error } = useGetAllFaqs();
	const [clickedEdit, setClickedEdit] = useState(false);
	const [faqsList, setFaqsList] = useState([]);
	const [faqId, setFaqId] = useState();

	useEffect(() =>{
		setFaqsList(faqs);
	},[faqs])

	if (loading) return <Loading/>;

	function handleClickEdit(id){
		setClickedEdit(true);
		setFaqId(id);
	}

	return (
	<main className="mx-10 my-10 flex flex-col gap-5">
		<h1 className="text-4xl sm:text-6xl text-primaryGreen font-semibold">
		Gestión de preguntas frecuentes (FAQs)
		</h1>
		<ol className='flex flex-col gap-5'>
		{
			faqsList.length > 0 ? 
			faqsList.map((faq) => {
					return (
							<li key={faq.id} className='list-decimal list-inside marker:text-primaryGreen marker:text-4xl marker:font-bold md:marker:text-5xl'>
								{
									clickedEdit && faqId === faq.id ?
										<EditFaq currentFaq={faq} faqsList={faqsList} setFaqsList={setFaqsList} faqId={faqId} setClickedEdit={setClickedEdit}/>
									:
										<div className="inline-flex space-x-3">
											<div>
												<span className="text-primaryGreen font-semibold text-2xl uppercase">{faq.question}</span>
												<p className='pt-4'>{faq.answer}</p>
											</div>
											<div className="flex-col space-x-3">
												<button onClick={()=>handleClickEdit(faq.id)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg></button>
												<button><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36"><path fill="currentColor" d="M27.14 34H8.86A2.93 2.93 0 0 1 6 31V11.23h2V31a.93.93 0 0 0 .86 1h18.28a.93.93 0 0 0 .86-1V11.23h2V31a2.93 2.93 0 0 1-2.86 3" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M30.78 9H5a1 1 0 0 1 0-2h25.78a1 1 0 0 1 0 2" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M21 13h2v15h-2z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="M13 13h2v15h-2z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M23 5.86h-1.9V4h-6.2v1.86H13V4a2 2 0 0 1 1.9-2h6.2A2 2 0 0 1 23 4Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="none" d="M0 0h36v36H0z"/></svg></button>
											</div>
											
										</div>
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
					<button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 hover:text-secondLightGray hover:bg-primaryGreen md:mt-4">
						AÑADIR NUEVA FAQ
					</button>
				</>
		}
		</ol>
	</main>
	);
};

export default FaqAdminPage;