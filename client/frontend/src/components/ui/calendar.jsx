import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const Calendar = () => {
  const initialDays = [new Date('We Jan 10 2024 18:02:00 GMT+0100 (hora estándar de Europa central)'), new Date('Sun Jan 21 2024 18:02:00 GMT+0100 (hora estándar de Europa central)')]; //Formato fechas
  const today = new Date();

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
        selected={initialDays}
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
      />
    </>
  );
};

export default Calendar;