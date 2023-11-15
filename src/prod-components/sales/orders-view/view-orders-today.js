'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import moment from 'moment';

import { getCollectibles, getSalesCount, getSalesData } from '../resources';
import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import apiRequest from '@/lib/axios';

const OrderListToday = ({ setCurrentPage, onEdit, currentPage, getWidth, setView }) => {
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);

  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      apiRequest({
        url: 'orders/today',
        method: 'POST',
        data: { dateFrom: moment().startOf('day'), dateTo: moment().endOf('day') },
      }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
    onSuccess: (orders) => {
      setCollectibleData(getCollectibles(orders));
      setSalesCount(getSalesCount(orders));
      setSalesData(getSalesData(orders));
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
        width={getWidth('left')}
      />
      <OrdersMainPage orderQuery={orderQuery} calendarDate={moment()} onEdit={onEdit} width={getWidth('right')} />
      <OrdersIconBar currentPage={currentPage} setCurrentPage={setCurrentPage} onView={() => setView((prev) => prev + 1)} />
    </>
  );
};

export default OrderListToday;
