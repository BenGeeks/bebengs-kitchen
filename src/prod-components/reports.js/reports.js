'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import moment from 'moment';

import ReportsMainPage from './reports-main-page';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';
import apiRequest from '@/lib/axios';

const ReportsPage = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(moment());

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'reports',
        method: 'POST',
        data: { dateFrom: moment(date).startOf('day'), dateTo: moment(date).endOf('day') },
      }).then((res) => res.data),
  });

  const setDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  return (
    <>
      {openCalendar && <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setDateHandler} defaultDate={date} />}
      <ReportsMainPage reportsQuery={reportsQuery} date={date} />
      <ReportsIconBar setOpenCalendar={setOpenCalendar} />
    </>
  );
};

export default ReportsPage;
