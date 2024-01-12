"use client";

import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import { initialEvents } from "../../mockup/events";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Calendar = () => {
  //let mousePositionX;
  //let mousePositionY;

  //const calendarRef = useRef(null);

  //const [mouseOnAside, setMouseOnAside] = useState(false);

  // YYYY-MM-DDTHH:mm:ssZ  --> Formato fecha para que la pueda usar el calendario

  /*useEffect(() => {
    window.addEventListener("mouseover", getMousePosition);
  }, []);*/

  /* const formatDate = (date) => {
    return date.toString().split(" ").slice(0, 4).join(" ");
  };*/

  /*const addAsideInfo = (event) => {
    const eventCalendarInfo = document.querySelector("#eventInfo");
    eventCalendarInfo.innerHTML = `
    <div class="relative h-full w-full items-start p-4 flex flex-col ">
    <h5 class="font-bold mb-2">${event.title}</h5>
    <p class="border-2 border-primaryGreen rounded-xl text-xs font-semibold px-2 py-1">${event.location}</p>
    <a class="text-primaryGreen underline decoration-primaryGreen absolute bottom-4 cursor-pointer">Inscríbete &gt;</a>
    </div>
    `;
    
    eventCalendarInfo.style.display = "flex";
    eventCalendarInfo.style.flexDirection = "column";
  };*/

  /*const getMousePosition = (e) => {
    mousePositionX = e.clientX;
    mousePositionY = e.clientY;
    
    document.removeEventListener("mouseover", getMousePosition);
    
    return { x: mousePositionX, y: mousePositionY };
  };*/

  /*const showEventInfo = (e) => {
    window.addEventListener("mouseover", getMousePosition);
    const calendarDate = formatDate(e);
    for (const date of eventsDate) {
      if (formatDate(date) === calendarDate) {
        for (const event of initialEvents) {
          const eventDate = new Date(event.date);
          if (formatDate(eventDate) === formatDate(calendarDate)) {
            setMouseOnAside(true);
            addAsideInfo(event);
            const eventCalendarInfo = document.querySelector("#eventInfo");
            eventCalendarInfo.style.left = `${mousePositionX}px`;
            eventCalendarInfo.style.top = `${mousePositionY}px`;
          }
        }
      }
    }
  };*/

  /*const hiddenEventInfo = () => {
    setMouseOnAside(false);
    if (!mouseOnAside && calendarRef.current) {
      const eventCalendarInfo = document.querySelector("#eventInfo");
      eventCalendarInfo.style.display = "none";
    }
  };*/

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
  const eventsDate = initialEvents.map((event) => {
    return parseISO(event.date);
  });
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState();

  const footer = selectedDay && (
    <div className="h-24 w-[275px] border-2 border-secondGray absolute bg-white rounded-lg p-2 shadow-xl z-50 ">
      <p className="font-bold">{selectedDay.title}</p>
      <p className="font-bold">{selectedDay.location}</p>
      <Link href="/" className="text-primaryGreen underline">
        Inscríbete &gt;{" "}
      </Link>
    </div>
  );

  const handleDayClick = (day) => {
    const event = initialEvents.find(
      (event) => new Date(event.date).toDateString() === day.toDateString()
    );
    setSelectedDay(event);
  };

  const handleClearDayClick = () => {
    setTimeout(() => {
      setSelectedDay(null);
    }, 5000);
  };

  return (
    <>
      <style>{css}</style>
      <DayPicker
        mode="multiple"
        selected={eventsDate}
        weekStartsOn={1}
        locale={es}
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        today={today}
        styles={{
          caption: {
            color: "#f5f5f5",
            backgroundColor: "#24C347",
            textTransform: "capitalize",
          },
          nav_button_next: { backgroundColor: "#24C347" },
          nav_button_previous: { backgroundColor: "#24C347" },
          head_cell: { backgroundColor: "#D9dAD9", color: "#808080" },
        }}
        onDayClick={handleDayClick}
        onDayTouchStart={handleDayClick}
        onDayTouchEnd={handleClearDayClick}
        onDayMouseLeave={handleClearDayClick}
        footer={footer}
      />
    </>
  );
};

export default Calendar;
