import Link from 'next/link';
import FormInput from '../../components/ui/formInput';

const Volunteers = () => {
  return (
    <main>
      <section className='flex flex-col items-center px-8 gap-4 md:items-start md:mt-4 lg:mx-8 lg:mt-8'>
        <h1 className='sm:text-balance font-bold text-lg lg:text-2xl'>¡Muchas gracias por tu interés en la Asociación Española Contra el Cáncer!</h1>
        <p className='text-balance'>Te contamos un poco más sobre nosotros: somos una organización sin ánimo de lucro formada por pacientes, familiares, voluntarios, colaboradores y profesionales. Unimos nuestros esfuerzos desde todas las provincias del Estado para disminuir el impacto causado por el cáncer y mejorar la vida de las personas.</p>
        <Link href={'https://talento.contraelcancer.es/jobs?_ga=2.229474140.1556651381.1704630589-1341541763.1702559712&_gac=1.153648586.1703178197.Cj0KCQiA4Y-sBhC6ARIsAGXF1g4xpShTtR0sJBxL84DCPOi3r5Yxp4L8b5RNz4UegvrMknb6aGAkcKAaAm1IEALw_wcB'} target='_blank' className='md:self-center'>
          <button 
            className="border-2 border-primaryGreen bg-primaryGreen 
            rounded-3xl text-sm font-bold px-10 py-2 self-center mb-6 md:mt-2 
            md:mb-8 hover:text-primaryBlack hover:bg-secondLightGray
            hover:border-primaryGreen">
              VOLUNTARIADOS ABIERTOS
          </button>
        </Link>
      </section>
      <section className='bg-blueBgSection p-8 lg:flex lg:flex-col lg:items-center'>
        <form className='flex flex-col gap-6 lg:w-3/4'>
          <div>
            <h2 className='font-bold text-lg mb-2 text-center text-balance lg:text-xl'>¿Quieres saber más acerca de nuestro objetivo y nuestros proyectos?</h2>
            <h3 className='text-sm text-center text-balance lg:text-base lg:mb-4'>Contacta con nosotros a través del formulario y te ayudaremos</h3>
          </div>
          <div className='flex flex-col gap-6 md:flex-row md:justify-center lg:justify-start'>
            <FormInput htmlFor={'name'} text={'Nombre *'} type={'text'}/>
            <FormInput htmlFor={'firstName'} text={'Apellidos *'} type={'text'}/>
          </div>
          <div className='flex flex-col gap-6 md:flex-row md:justify-center lg:justify-start'>
            <FormInput htmlFor={'email'} text={'Email *'} type={'email'}/>
            <FormInput htmlFor={'phone'} text={'Teléfono *'} type={'phone'}/>
          </div>
          <div className='md:pl-5 lg:flex lg:flex-col lg:pl-0'>
            <FormInput htmlFor={'location'} text={'Localidad *'} type={'text'}/>
          </div>
          <label htmlFor="message" className='font-bold flex flex-col gap-2 md:pl-5 md:pr-5 lg:pl-0 lg:pr-0'>Mensaje *
            <textarea 
              name="message" 
              id="message" 
              cols="30" 
              rows="10"
              className='border border-[#cccccc] p-4 rounded-s resize-none font-light'
            />
          </label>
          <div className='flex items-start md:justify-center'>
            <input type="checkbox" className='mt-1 mr-2'/>
            <p className='text-sm'>He leído y acepto el <Link href={'/'} className='font-bold text-primaryGreen'>aviso legal</Link> y la <Link href={'/'} className='font-bold text-primaryGreen'>política de privacidad</Link>*</p>
          </div>
          <div className='flex justify-center'>
            <button className='border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen'>ENVIAR</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Volunteers;