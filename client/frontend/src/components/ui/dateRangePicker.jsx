"use client"

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {es} from 'date-fns/locale';

const DateTimePickerValue = ({ setEventDateEnd, setEventDateStart }) => {
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  function handleChangeStart(e){
    setEventDateStart(e);
  }

  function handleChangeEnd(e){
    setEventDateEnd(e);
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
              label="Hasta"
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