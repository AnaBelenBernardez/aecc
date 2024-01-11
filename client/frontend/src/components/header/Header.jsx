import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
      <header>
        <nav className="bg-secondLightGray py-6 relative">
          <div className="container mx-auto flex">
            <div className='flex-grow'>
              <Image src="/logos/CC_Logo_transicion_color_pos.rgb.svg" alt="Logo Asociación Española Contra el Cáncer" width="150" height="150" className='self-center'/>
            </div>
            
            <div className='flex flex-col items-end'>
              <div className='text-right mb-4'>
                <p>
                  ES|GAL
                </p>
              </div>
              <div className='my-4'>
                <Link href="/" className='hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7'>Inicio</Link>
                <Link href="/calendario-e-inscripciones" className='hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7'>Calendario e inscripciones</Link>
                <a href="" className='lg:mr-7'>Galería</a>
                <a href="" className='lg:mr-7'>FAQ</a>
                <a href="" className='lg:mr-7'>Voluntarios</a>
                <a href="" className='lg:mr-7'>Patrocinios</a>
                <Link href="https://www.contraelcancer.es/es/actualidad/noticias" className='hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7'>Noticias</Link>
                <a href="https://blog.contraelcancer.es/" className='hover:text-primaryGreen transition-all duration-300 ease-in-out lg:mr-7'>Blog</a>
                <a href="" className='lg:mr-7'>Contacto</a>
              </div>
            </div>


          </div>
        </nav>
      </header>
    )
  }
  
  export default Header;