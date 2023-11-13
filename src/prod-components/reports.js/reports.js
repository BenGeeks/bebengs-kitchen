'use client';
import React, { useState } from 'react';
import moment from 'moment';

import DailyReportPage from './reports-daily';
import MonthlyReportPage from './report-monthly';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';

const ReportsPage = () => {
  const [currentPage, setCurrentPage] = useState('daily');
  const [openDailyCalendar, setOpenDailyCalendar] = useState(false);
  const [openMonthlyCalendar, setOpenMonthlyCalendar] = useState(false);
  const [date, setDate] = useState(moment());

  const setDayDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenDailyCalendar(false);
    }, 10);
  };

  const setMonthDateHandler = (date) => {
    setDate(date);
    setTimeout(() => {
      setOpenMonthlyCalendar(false);
    }, 10);
  };

  return (
    <>
      {openDailyCalendar && (
        <DatePicker
          open={openDailyCalendar}
          close={() => setOpenDailyCalendar(false)}
          onSave={setDayDateHandler}
          defaultDate={date}
          noDay={false}
        />
      )}
      {openMonthlyCalendar && (
        <DatePicker
          open={openMonthlyCalendar}
          close={() => setOpenMonthlyCalendar(false)}
          onSave={setMonthDateHandler}
          defaultDate={date}
          noDay={true}
        />
      )}
      {currentPage === 'daily' && <DailyReportPage date={date} openDailyCalendar={openDailyCalendar} />}
      {currentPage === 'monthly' && <MonthlyReportPage date={date} />}
      <ReportsIconBar
        openDailyCalendar={openDailyCalendar}
        openMonthlyCalendar={openMonthlyCalendar}
        setOpenDailyCalendar={setOpenDailyCalendar}
        setOpenMonthlyCalendar={setOpenMonthlyCalendar}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ReportsPage;
