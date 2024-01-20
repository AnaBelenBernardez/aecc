"use client"

import SelectInput from '../../components/ui/selectInput';
import DateTimePickerValue from '../../components/ui/dateRangePicker';
import { CardEvent } from '../../components/events/CardEvent/CardEvent';
import useGetAllEvents from '../../hooks/useGetAllEvents';
import Image from 'next/image';
import Link from 'next/link';

export default function CalendarAndRegistration() {
  const { events, loading, error } = useGetAllEvents();

  const categoryEvents = [];
  const locations = [];

  events.forEach((event) => {
    if (!categoryEvents.includes(event.event_type)) {
      categoryEvents.push(event.event_type);
    }

    if (!locations.includes(event.location)) {
      locations.push(event.location);
    }
  });

  return (
    <main className='flex flex-col'>
      <section className='bg-blueBgSection flex flex-col gap-4 px-7 lg:pb-10'>
        <h2 className="text-lg font-extrabold text-center pt-6 pb-2">Encuentra un evento #contraelcáncer</h2>
        <div className='flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <SelectInput text={'Tipo de evento'} eventType={'events'} options={categoryEvents}></SelectInput>
            <SelectInput text={'Localidades'} eventType={'locations'} options={locations}></SelectInput>
          </div>
          <DateTimePickerValue></DateTimePickerValue>
          <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-6 lg:self-end lg:mb-2 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen">Buscar</button>
        </div>
      </section>
      {
        events.length > 0
          ? <section className='mb-8'>
              <h2 className="text-2xl font-bold text-center mb-9 mt-9 sm:text-5xl sm:text-left sm:ml-10">Próximos eventos</h2>
              <ul className='flex flex-wrap gap-10 justify-center'>
                {
                  loading ? null
                  : events.map((event) => {
                    return <li key={event.id}><CardEvent title={event.title}
                    image={event.event_photos[0]}
                    description={event.content}
                    location={event.location}
                    link={event.link}></CardEvent></li>
                  })
                }
              </ul>
            </section>
          : <>
              <div className='flex items-center gap-6 my-10 px-4 lg:my-0 lg:mt-28 lg:justify-center'> 
                <Image src={'/image/noEventsYet.svg'} width={150} height={150}/>
                <div className='flex flex-col'>
                  <p>Estamos trabajando en nuevos eventos para luchar contra el cáncer.</p>
                  <p>Vuelve pronto y únete a la causa. <span className='font-bold'>#JuntosContraElCáncer</span></p>
                </div>
              </div>
              <Link href={'/'} className='self-center'><button className='border border-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 mb-6 hover:text-secondLightGray hover:bg-primaryGreen'>VOLVER AL INICIO</button></Link>
            </>
      }
    </main>
  )
}