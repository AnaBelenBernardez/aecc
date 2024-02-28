"use client";

import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import Link from "next/link";
import useGetAllEvents from '../../hooks/useGetAllEvents';
import Loading from '../loading/Loading';

const Calendar = () => {
  const css = `
  @media (min-width: 768px) {
    .rdp {
      --rdp-cell-size: 50px;
    }
  }
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
  
  const absolutely = true;
  const { events, loading, error } = useGetAllEvents(absolutely);
  
  const eventsDate = events.map((event) => {
    return parseISO(event.date_start);
  });
  const today = new Date();
  
  const [showTimeout, setShowTimeout] = useState(null);
  const [selectedDay, setSelectedDay] = useState();

  const [isMouseOverDay, setIsMouseOverDay] = useState(false);
  const [isMouseOverFooter, setIsMouseOverFooter] = useState(false);

  const handleMouseEnterDay = () => {
    setIsMouseOverDay(true);
    clearTimeout(showTimeout);
  };

  const handleMouseLeaveDay = () => {
    setIsMouseOverDay(false);
    startCloseTimer();
  };

  const handleMouseEnterFooter = () => {
    setIsMouseOverFooter(true);
    clearTimeout(showTimeout);
  };

  const handleMouseLeaveFooter = () => {
    setIsMouseOverFooter(false);
    startCloseTimer();
  };

  const handleContainerMouseLeave = () => {
    if (!isMouseOverDay && !isMouseOverFooter) {
      startCloseTimer();
    }
  };

  const startCloseTimer = () => {
    const timeoutId = setTimeout(() => {
      setSelectedDay(null);
    }, 3000);
    setShowTimeout(timeoutId);
  };
    
  const handleDayClick = (day) => {
    clearTimeout(showTimeout);
  
    const event = events.find(
      (event) => new Date(event.date_start).toDateString() === day.toDateString()
    );
    setSelectedDay(event);
  };

  const footer = selectedDay && (
    <div className="h-36 w-[275px] border-2 border-secondGray absolute bg-white rounded-lg p-2 shadow-xl z-50 md:w-[350px]" onMouseEnter={handleMouseEnterFooter}
    onMouseLeave={handleMouseLeaveFooter}>
      <p className="font-bold">{selectedDay.title}</p>
      <p className="font-bold">{selectedDay.location}</p>
      {
        events.map((event) => {
          return (
            <Link href={event.link} className="text-primaryGreen underline absolute bottom-4 cursor-pointer" target='_blank' key={event.id}>
              Inscríbete &gt;{" "}
            </Link>
          )
        })
      }
    </div>
  );
  
  if (loading) return <Loading/>;
   
  return (
    <div onMouseLeave={handleContainerMouseLeave}>
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
        onMouseEnter={handleMouseEnterDay}
        onMouseLeave={handleMouseLeaveDay}
        footer={footer}
        />
    </div>
  );
};

export default Calendar;
