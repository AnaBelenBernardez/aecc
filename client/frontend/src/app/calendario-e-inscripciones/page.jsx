"use client"

import SelectInput from '../../components/ui/selectInput';
import DateTimePickerValue from '../../components/ui/dateRangePicker';
import { initialEvents } from '../../mockup/events';
import { CardEvent } from '../../components/events/CardEvent/CardEvent';

export default function CalendarAndRegistration() {
  const localidades = ['Todas las localidades', 'Malpica de Bergantiños', 'Miño', 'Laracha', 'A Pobra', 'As Pontes'];
  const categoryEvents = ['Todos los eventos', 'Andainas y Carreras', 'Travesía a nado', 'Torneo de pádel', 'Bicicleta', 'Otras actividades deportivas'];

  return (
    <main>
      <section className='bg-blueBgSection flex flex-col gap-4 px-7 lg:pb-10'>
        <h2 className="text-lg font-extrabold text-center pt-6 pb-2">Encuentra un evento #contraelcáncer</h2>
        <div className='flex flex-col gap-6 lg:flex-row lg:w-full lg:items-end lg:justify-center'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <SelectInput text={'Tipo de evento'} eventType={'events'} options={categoryEvents}></SelectInput>
            <SelectInput text={'Localidades'} eventType={'locations'} options={localidades}></SelectInput>
          </div>
          <DateTimePickerValue></DateTimePickerValue>
          <button className="bg-primaryGreen rounded-3xl text-sm font-bold px-10 py-2 self-center mb-6 lg:self-end lg:mb-2">Buscar</button>
        </div>
      </section>
      <section className='mb-8'>
        <h2 className="text-2xl font-bold text-center mb-9 mt-9 sm:text-5xl sm:text-left sm:ml-10">Próximos eventos</h2>
        <ul className='flex flex-wrap gap-10 justify-center'>
          {
            initialEvents.map((event) => {
              return <li key={event.id}><CardEvent title={event.title}
              image={event.image}
              description={event.description}
              location={event.location}></CardEvent></li>
            })
          }
        </ul>
      </section>
    </main>
  )
}