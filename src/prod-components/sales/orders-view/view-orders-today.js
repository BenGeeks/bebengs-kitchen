'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import moment from 'moment';

import { getSalesCount, getSalesData, getCollectibles } from '@/assets/functions';
import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import apiRequest from '@/lib/axios';

const OrderListToday = ({ setCurrentPage, onEdit, currentPage, setView, leftWidth }) => {
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);

  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiRequest({ url: 'orders/today', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
    onSuccess: (orders) => {
      setCollectibleData(getCollectibles(orders));
      setSalesCount(getSalesCount(orders));
      setSalesData(getSalesData(orders, moment()));
    },
  });

  return (
    <>
      <OrdersSideBar
        orderQuery={orderQuery}
        salesData={salesData}
        salesCount={salesCount}
        collectibleData={collectibleData}
        calendarDate={moment()}
        width={`${leftWidth}%`}
      />
      <OrdersMainPage orderQuery={orderQuery} calendarDate={moment()} onEdit={onEdit} width={`${100 - leftWidth}%`} />
      <OrdersIconBar currentPage={currentPage} setCurrentPage={setCurrentPage} onView={() => setView((prev) => prev + 1)} />
    </>
  );
};

export default OrderListToday;
