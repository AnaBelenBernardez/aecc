import Image from 'next/image'
import Link from 'next/link'
import "../../app/globals.css";

const Footer = () => {
  return (
    <footer className='w-full fixed bottom-0 flex flex-col items-center text-center bg-secondLightGray py-8 lg:flex-row lg:items-start lg:justify-around lg:text-left'>
      <section className='flex flex-col mb-6'>
        <Image src="/logos/CC_Logo_transicion_color_pos.rgb.svg" alt="Logo Asociación Española Contra el Cáncer" width="150" height="150" className='self-center mb-6'/>
        <p className='font-extrabold mb-2'>Dirección A Coruña</p>
        <p className='mb-4'>Rúa Real, 1, 1°, 15003 A Coruña</p>
        <div className='flex justify-center gap-10'>
          <Link href="https://www.facebook.com/contraelcancer.es">
            <Image src="/icons/facebookIcon.svg" alt="Icono Facebook" width="25" height="25" title="Facebook"/>
          </Link>
          <Link href="https://twitter.com/ContraCancerEs">
            <Image src="/icons/twitterIcon.svg" alt="Icono Twiiter" width="25" height="25" title="Twitter"/>
          </Link>
          <Link href="https://www.instagram.com/contraelcancer.es/">
            <Image src="/icons/instagramIcon.svg" alt="Icono Instagram" width="25" height="25" title="Instagram"/>
          </Link>
          <Link href="https://www.youtube.com/user/aecc">
            <Image src="/icons/youtubeIcon.svg" alt="Icono Youtube" width="25" height="25" title="Youtube"/>
          </Link>
        </div>
      </section>
      <section className='mb-6'>
        <h2 className='font-extrabold mb-2'>SOBRE NUESTROS EVENTOS</h2>
        <ul className='flex flex-col gap-2'>
          <a>
            <li>Calendario e inscripciones</li>
          </a>
          <a>
            <li>Preguntas frecuentes</li>
          </a>
          <a>
            <li>¿Eres voluntario?</li>
          </a>
          <Link href="https://colabora.contraelcancer.es/empresas/eventos-solidarios" className='hover:text-primaryGreen'>
            <li>Quiero patrocinar un evento</li>
          </Link>
          <a>
            <li>Contacto</li>
          </a>
        </ul>
      </section>
      <section>
        <h2 className='font-extrabold mb-2'>NO TE PIERDAS NADA</h2>
        <ul className='flex flex-col gap-2'>
          <a>
            <li>Noticias</li>
          </a>
          <Link href="https://blog.contraelcancer.es/" className='hover:text-primaryGreen'>
            <li>Blog</li>
          </Link>
        </ul>
      </section>
    </footer>
  )
}

export default Footer;