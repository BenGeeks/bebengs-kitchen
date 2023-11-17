'use client';
import React, { useState } from 'react';
import moment from 'moment';

import MonthlyReportPage from './report-monthly';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';
import DailyReportPage from './reports-daily';

const ReportsPage = () => {
  const [openMonthlyCalendar, setOpenMonthlyCalendar] = useState(false);
  const [openDailyCalendar, setOpenDailyCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState('daily');
  const [date, setDate] = useState(moment());
  const [addEntry, setAddEntry] = useState(false);

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
      {currentPage === 'monthly' && <MonthlyReportPage date={date} setAddEntry={setAddEntry} addEntry={addEntry} />}
      <ReportsIconBar
        openDailyCalendar={openDailyCalendar}
        openMonthlyCalendar={openMonthlyCalendar}
        setOpenDailyCalendar={setOpenDailyCalendar}
        setOpenMonthlyCalendar={setOpenMonthlyCalendar}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setAddEntry={setAddEntry}
      />
    </>
  );
};

export default ReportsPage;
