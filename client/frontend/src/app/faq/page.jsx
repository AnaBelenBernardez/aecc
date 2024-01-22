"use client"

import useGetAllFaqs from '../../hooks/useGetAllFaqs';
import Image from 'next/image';
import Link from 'next/link';

const FaqPage = () => {
  const { faqs, loading, error } = useGetAllFaqs();

  return (
    <main className="mx-10 my-10 flex flex-col gap-5">
      <h1 className="text-4xl sm:text-6xl text-primaryGreen font-semibold">
        Preguntas frecuentes FAQS
      </h1>
      <ol className='flex flex-col gap-5'>
        {
          faqs.length > 0
            ? faqs.map((faq) => {
                return (
                  <li key={faq.id} className='list-decimal list-inside marker:text-primaryGreen marker:text-4xl marker:font-bold md:marker:text-5xl'>
                    <span className="text-primaryGreen font-semibold text-2xl uppercase">{faq.question}</span>
                    <p className='pt-4'>{faq.answer}</p>
                  </li>
                )
              })
            : <>
              <div className='flex flex-col md:flex-row md:justify-center md:items-center'>
                <Image src={'/image/noFaqsYet.svg'} width={300} height={300} alt='Todavía no hay FAQs' className='mb-6 md:mb-0'/>
                <p className='text-balance md:pl-10 lg:w-1/2'>¡Gracias por tu interés! Actualmente no hay preguntas frecuentes disponibles, pero estamos trabajando para brindarte la información que necesitas. ¡Vuelve pronto!</p>
              </div>
              <Link href={'/'} className='self-center'>
                <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 hover:text-secondLightGray hover:bg-primaryGreen md:mt-4">
                  VOLVER AL INICIO
                </button>
              </Link>
              </>
        }
      </ol>
    </main>
  );
};

export default FaqPage;
