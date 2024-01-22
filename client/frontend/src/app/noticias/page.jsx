"use client"

import Image from 'next/image';
import Link from 'next/link';
import useGetAllNews from '../../hooks/useGetAllNews';

const myDate = new Date().toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' }).toLocaleUpperCase();

/* const news = [
  {
    id: "1",
    title: "La Asociación Española Contra el Cáncer presenta un informe sobre la situación de la investigación oncológica en Galicia",
    content: `La Asociación Española Contra el Cáncer presentó el viernes 6 de octubre, en Santiago de Compostela, el informe Radiografía 
    sobre el estado de la investigación en cáncer en Galicia elaborado por la Fundación Científica de la Asociación. Galicia ha sido una de 
    las primeras seleccionadas para realizar el estudio, que se irá ampliando al resto de autonomías. El objetivo del documento es conocer la 
    realidad de los científicos de nuestro territorio, poder aportar recomendaciones a nivel autonómico y servir de apoyo para fomentar una 
    mayor equidad sanitaria en términos de capacidades de investigación a nivel nacional que repercuta en un beneficio para los pacientes oncológicos.`,
    link: "https://www.contraelcancer.es/es/actualidad/noticias/asociacion-espanola-contra-cancer-presenta-informe-sobre-situacion-investigacion-oncologica-galicia",
    date: `${myDate}`
  },
  {
    id: "2",
    title: "Abiertas las inscripciones para la X Edición de la andaina A Coruña en marcha contra el cáncer",
    content: `La Asociación Española Contra el Cáncer organiza el próximo domingo 4 de junio la X Edición de su andaina solidaria 
    “A Coruña En Marcha Contra o Cancro”. El evento solidario tiene como objetivo recaudar fondos que se destinarán a seguir promoviendo la investigación 
    oncológica y apoyar a los miles de pacientes y familias. Una andaina para todos y todas. Esta X Edición de "A Coruña En Marcha Contra o Cancro" 
    será un evento lúdico y festivo en el que todas las personas que quieran participar pueden hacerlo. Una cita para acudir con la familia, con vecinos, amigos, incluso con las mascotas.`,
    link: "https://www.contraelcancer.es/es/actualidad/noticias/abiertas-inscripciones-x-edicion-andaina-coruna-marcha-contra-cancer",
    date: `${myDate}`
  },{
    id: "3",
    title: "Lazos humanos Contra el Cáncer en la provincia de A Coruña",
    content: `El sábado 4 de febrero es el Día Mundial Contra el Cáncer y desde la Asociación Española Contra el Cáncer queremos llenar toda 
    la provincia de A Coruña de lazos solidarios por la prevención y la investigación de la enfermedad, para estar todos unidos contra el cáncer e incrementar la supervivencia hasta el 70% en 2030.`,
    link: "https://www.contraelcancer.es/es/actualidad/noticias/lazos-humanos-contra-cancer-provincia-coruna",
    date: `${myDate}`
  },{
    id: "4",
    title: "Novas actividades e talleres gratuítos para pacientes de cancro na Coruña, Santiago e Ferrol",
    content: `A Asociación Española Contra o Cancro presenta o seu programa de actividades gratuítas EnRede 2022-2023, na Coruña, Ferrol e Santiago de Compostela.
    Máis de 400 prazas ofertadas, para máis de 15 actividades e talleres en prevención, apoio, formación, lecer e tempo libre, dirixidas a pacientes oncolóxicos, familiares, 
    persoas que atravesen un dolo e poboación xeral. “Desde a Asociación, realizamos unha selección das actividades máis adecuadas para pacientes e familiares, innovando en 
    actividades e mantendo as que máis éxito teñen. A evidencia científica cada vez pon máis de manifesto, que ter un estilo de vida activo prevén o cancro, especialmente algúns 
    tipos, así como as súas posibles recaídas, por iso gran parte das actividades están enfocadas ao exercicio físico e algunhas delas abertas á poboación xeral, como os Roteiros 
    Saudables” afirma Inés López, fisioterapeuta da Asociación Española Contra o Cancro. EnRede funciona, ademais, como un espazo de encontro, intercambio de experiencias e vivencias 
    para afrontar mellor a enfermidade, do que 600 persoas resultaron beneficiadas desde a súa creación en 2017.`,
    link: "https://www.contraelcancer.es/es/actualidad/noticias/novas-actividades-e-talleres-gratuitos-pacientes-cancro-na-coruna-santiago-e-ferrol",
    date: `${myDate}`
  },{
    id: "5",
    title: `Inscripciones abiertas para la andaina solidaria "Santiago de Compostela En Marcha Contra o Cancro"`,
    content: `La Asociación Española Contra el Cáncer en Santiago de Compostela organiza la I Andaina Solidaria En Marcha contra o Cancro que tendrá lugar el próximo 24 de 
    septiembre con salida desde la emblemática Alameda. ¡Ven a caminar con nosotros contra el cáncer!. Las inscripciones ya están abiertas y pueden realizarse en la página 
    web o en la sede de la Asociación en Santiago (Avda. Barcelona, 29, bajo). La inscripción estará abierta hasta el próximo 22 de septiembre a las 15:00 horas.`,
    link: "https://www.contraelcancer.es/es/actualidad/noticias/inscripciones-abiertas-andaina-solidaria-santiago-compostela-marcha-contra-o-cancro",
    date: `${myDate}`
  }
] */

const Noticias = () => {
  const { news, loading, error } = useGetAllNews();

  return (
    <main className='flex flex-col gap-2 mx-auto mb-4'>
      <h1 className='font-bold text-primaryGreen text-xl pt-4 pl-6 lg:text-3xl lg:pt-6 lg:pb-6 lg:pl-0'>Noticias</h1>
      {
        news.length > 0 
          ? news.map((newItem) => {
              return (
                <Link href={newItem.link} target='_blank' key={newItem.id}>
                  <article className='flex justify-between p-8 items-center shadow-md'>
                    <div className='flex items-center'>
                      <p className='w-[52px] text-center flex items-center text-lightPink font-bold'>{newItem.date}</p>
                      <h2 className='font-bold px-6'>{newItem.title}</h2>
                    </div>
                    <div className='self-center hidden lg:block'>
                      <Image src={'/image/noEventsYet.svg'} width={50} height={50} alt='Imagen de la noticia'/>
                    </div>
                  </article>
                </Link>
              )
            })
          : <>
              <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
                <Image src={'/image/noNewsYet.svg'} width={300} height={300} alt='Noticias'/>
                <p className='mt-2 font-bold md:text-center'>Todavía no hay noticias</p>
              </div>
              <Link href={'/'} className='self-center'>
                <button className="border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mt-4 mb-4 hover:text-secondLightGray hover:bg-primaryGreen">
                  VOLVER AL INICIO
                </button>
              </Link>
            </>
      }
    </main>
  )
};  

export default Noticias;