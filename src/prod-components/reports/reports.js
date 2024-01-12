'use client';
import React, { useState } from 'react';
import moment from 'moment';

import MonthlyReportPage from './monthly/report-monthly';
import DashboarDatePicker from './dashboard-date-picker';
import DailyReportPage from './daily/reports-daily';
import DashboardPage from './dashboard/dashboard';
import ReportsIconBar from './reports-icon-bar';
import DatePicker from '@/assets/date-picker';

const ReportsPage = () => {
  const [openMonthlyCalendar, setOpenMonthlyCalendar] = useState(false);
  const [openDailyCalendar, setOpenDailyCalendar] = useState(false);
  const [openDashboardCalendar, setOpenDashboardCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [date, setDate] = useState({ year: moment().year(), month: moment().month(), day: moment().date() });
  const [addEntry, setAddEntry] = useState(false);

  const [month, setMonth] = useState(moment().month());
  const [quarter, setQuarter] = useState(moment().quarter());
  const [year, setYear] = useState(moment().year());
  const [filterBy, setFilterBy] = useState('year');
  const [filterValue, setFilterValue] = useState(moment().year());

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

  const onDashboardFilterSelect = () => {
    filterBy === 'year' && setFilterValue(year);
    filterBy === 'quarter' && setFilterValue(`Q${quarter}_${year}`);
    filterBy === 'month' && setFilterValue(`${month}_${year}`);
    setOpenDashboardCalendar(false);
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
      {openDashboardCalendar && (
        <DashboarDatePicker
          open={openDashboardCalendar}
          close={() => setOpenDashboardCalendar(false)}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterValue={filterValue}
          month={month}
          setMonth={setMonth}
          quarter={quarter}
          setQuarter={setQuarter}
          year={year}
          setYear={setYear}
          onSave={onDashboardFilterSelect}
        />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage
          filterBy={filterBy}
          filterValue={filterValue}
          year={year}
          quarter={quarter}
          month={month}
          openDashboardCalendar={openDashboardCalendar}
        />
      )}
      {currentPage === 'daily' && <DailyReportPage date={date} setDate={setDate} openDailyCalendar={openDailyCalendar} />}
      {currentPage === 'monthly' && (
        <MonthlyReportPage
          date={date}
          setDate={setDate}
          openMonthlyCalendar={openMonthlyCalendar}
          setAddEntry={setAddEntry}
          addEntry={addEntry}
        />
      )}
      <ReportsIconBar
        openDailyCalendar={openDailyCalendar}
        openMonthlyCalendar={openMonthlyCalendar}
        setOpenDashboardCalendar={setOpenDashboardCalendar}
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
