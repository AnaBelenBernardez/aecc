"use client"

import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { parseISO } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { initialEvents } from '../../mockup/events';
import { useEffect } from 'react';

const Calendar = () => {
  let mousePositionX;
  let mousePositionY;

  // YYYY-MM-DDTHH:mm:ssZ  --> Formato fecha para que la pueda usar el calendario
  const eventsDate = initialEvents.map((event) => {
    return parseISO(event.date);
  });

  const today = new Date();

  useEffect(() => {
    window.addEventListener('mouseover', getMousePosition);
  }, [])

  const formatDate = (date) => {
    return date.toString().split(' ').slice(0, 4).join(' ');
  }

  const addAsideInfo = (event) => {
    const eventCalendarInfo = document.querySelector('#eventInfo');
    eventCalendarInfo.innerHTML = `
    <div class="relative h-full w-full items-start p-4 flex flex-col">
    <h5 class="font-bold mb-2">${event.title}</h5>
    <p class="border-2 border-primaryGreen rounded-xl text-xs font-semibold px-2 py-1">${event.location}</p>
    <a class="text-primaryGreen underline decoration-primaryGreen absolute bottom-4 cursor-pointer">Inscríbete &gt;</a>
    </div>
    `
    
    eventCalendarInfo.style.display = 'flex';
    eventCalendarInfo.style.flexDirection = 'column';
  }

  const getMousePosition = (e) => {
    mousePositionX = e.clientX;
    mousePositionY = e.clientY;

    document.removeEventListener('mouseover', getMousePosition);

    return { x: mousePositionX, y: mousePositionY};
  }

  const showEventInfo = (e) => {
    window.addEventListener('mouseover', getMousePosition);
    const calendarDate = formatDate(e);
    for (const date of eventsDate) {
      if(formatDate(date) === calendarDate) {
        for (const event of initialEvents) {
          const eventDate = new Date(event.date);
          if(formatDate(eventDate) === formatDate(calendarDate)) {
            addAsideInfo(event);
            const eventCalendarInfo = document.querySelector('#eventInfo');
            eventCalendarInfo.style.left = `${mousePositionX}px`;
            eventCalendarInfo.style.top = `${mousePositionY}px`;
          }
        }
      };
    };
  };

  const css = `
    .my-selected:not([disabled]) { 
      font-weight: bold; 
      border: 2px solid #24C347;
      color: #f5f5f5;
      border-radius: 0;
      background-color: #24C347;
    }
    .my-selected:hover:not([disabled]) { 
      border-color: #24C347;
      color: #f5f5f5;
    }
    .my-today { 
      font-weight: bold;
      color: #232323;
      border-radius: 0;
      background-color: none;
      border: 2px solid #24C347;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <DayPicker
        mode="multiple"
        selected={eventsDate}
        weekStartsOn={1}
        locale={es}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
        today={today}
        styles={{
          caption: { color: '#f5f5f5', backgroundColor: '#24C347', textTransform: 'capitalize' },
          nav_button_next: { backgroundColor: '#24C347'},
          nav_button_previous: { backgroundColor: '#24C347' },
          head_cell: { backgroundColor: '#D9dAD9', color: '#808080'}
        }}
        onDayMouseEnter={showEventInfo}
        onDayTouchStart={showEventInfo}
      />
      <aside id="eventInfo" className='w-80 h-40 shadow-md hidden fixed bg-white'></aside>
    </>
  );
};

export default Calendar;