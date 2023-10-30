import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import moment from 'moment';

import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';

import apiRequest from '@/lib/axios';

const OrderListToday = ({ setCurrentPage, onEdit, currentPage }) => {
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);

  const summarizeReport = (sales) => {
    let tempArray = [];
    let summary = {};
    let cash = 0;
    let gCash = 0;
    let collectibles = [];
    sales?.forEach((order) => {
      if (order.isPaid) {
        if (order.isGcash) gCash = gCash + order.total;
        if (!order.isGcash) cash = cash + order.total;
        order.orderDetails.items.forEach((item) => {
          if (summary[item._id]) {
            summary[item._id] = { ...item, qty: summary[item._id].qty + item.qty };
          } else {
            summary[item._id] = item;
          }
        });
      }

      if (order.isDelivered && !order.isPaid) {
        collectibles.push({ name: order.orderDetails.customer.name, amount: order.total });
      }
    });
    const keys = Object.keys(summary);
    keys.forEach((key) => {
      tempArray.push(summary[key]);
    });

    setSalesData({ cashTotal: cash, gCashTotal: gCash, dailyTotal: cash + gCash });
    setSalesCount(tempArray);
    setCollectibleData(collectibles);
  };

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
      summarizeReport(orders);
    },
  });

  useEffect(() => summarizeReport(orderQuery.data), []);

  return (
    <>
      <OrdersSideBar salesData={salesData} salesCount={salesCount} collectibleData={collectibleData} calendarDate={moment()} />
      <OrdersMainPage orderQuery={orderQuery} onEdit={onEdit} />
      <OrdersIconBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default OrderListToday;