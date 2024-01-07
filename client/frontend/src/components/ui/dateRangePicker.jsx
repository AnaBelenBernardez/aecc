"use client"

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {es} from 'date-fns/locale';

const DateTimePickerValue = () => {
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
          <div className='w-full flex flex-col gap-6 md:flex-row md:justify-center'>
            <DateTimePicker
              views={['year', 'month', 'day']}
              label="Desde"
              value={fromValue}
              format='dd/MM/yy'
              formatDensity='spacious'
              onChange={(newValue) => setFromValue(newValue)}
              minDateTime={dateNow}
              className='bg-[#f5f5f5] w-full md:w-56'
            />
            <DateTimePicker
              views={['year', 'month', 'day']}
              label="Hasta"
              value={toValue}
              format='dd/MM/yy'
              formatDensity='spacious'
              onChange={(newValue) => setToValue(newValue)}
              minDateTime={fromValue}
              className='bg-[#f5f5f5] w-full md:w-56'
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
  );
}

export default DateTimePickerValue;