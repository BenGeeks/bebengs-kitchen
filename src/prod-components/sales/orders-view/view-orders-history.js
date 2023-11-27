'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { getSalesCount, getSalesData } from '@/assets/functions';
import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import DatePicker from '@/assets/date-picker';

import apiRequest from '@/lib/axios';

const OrderListHistory = ({ currentPage, setCurrentPage, onEdit, calendarDate, setCalendarDate, setView, leftWidth }) => {
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(true);

  const orderQuery = useQuery({
    queryKey: ['history'],
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: `orders/history/${moment(calendarDate).format('YYYY-MM-DD')}`,
        method: 'GET',
      }).then((res) => res.data),
    onSuccess: (orders) => {
      setSalesData(getSalesData(orders, calendarDate));
      setSalesCount(getSalesCount(orders, calendarDate));
    },
  });

  const setCalendarHandler = (date) => {
    setCalendarDate(moment(date));
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  return (
    <>
      {openCalendar && (
        <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setCalendarHandler} defaultDate={calendarDate} />
      )}
      <OrdersSideBar
        orderQuery={orderQuery}
        salesData={salesData}
        salesCount={salesCount}
        collectibleData={[]}
        calendarDate={calendarDate}
        width={`${leftWidth}%`}
      />
      <OrdersMainPage orderQuery={orderQuery} onEdit={onEdit} width={`${100 - leftWidth}%`} calendarDate={calendarDate} />
      <OrdersIconBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setOpenCalendar={setOpenCalendar}
        onView={() => setView((prev) => prev + 1)}
      />
    </>
  );
};

export default OrderListHistory;
