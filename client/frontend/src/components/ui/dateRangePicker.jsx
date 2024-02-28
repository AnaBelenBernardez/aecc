"use client"

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {es} from 'date-fns/locale';

const DateTimePickerValue = ({ setEventDateEnd, setEventDateStart, language }) => {
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  function handleChangeStart(e){
    console.log(e)
    if(e) e.toString() !== "Invalid Date" ?  setEventDateStart(e) : setEventDateStart(new Date());
  }

  function handleChangeEnd(e){
    if(e){
      if(e.toString() !== "Invalid Date"){
        if(e.getFullYear() >= 2024) setEventDateEnd(e);
      }else{
        setEventDateEnd(new Date(new Date().setFullYear(parseInt(new Date().getFullYear())+1)));
      }
    }
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
          <div className='w-full flex flex-col gap-6 md:flex-row md:justify-center'>
            <DateTimePicker
              name="eventDateStart"
              views={['year', 'month', 'day']}
              label="Desde"
              format='dd/MM/yy'
              formatDensity='spacious'
              onChange={handleChangeStart}
              minDateTime={dateNow}
              className='bg-[#f5f5f5] w-full md:w-56'
            />
            <DateTimePicker
              name="eventDateEnd"
              views={['year', 'month', 'day']}
              label={language === 'es' ? 'Hasta' : 'Ata'}
              format='dd/MM/yy'
              formatDensity='spacious'
              onChange={handleChangeEnd}
              minDateTime={dateNow} 
              className='bg-[#f5f5f5] w-full md:w-56'
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
  );
}

export default DateTimePickerValue;