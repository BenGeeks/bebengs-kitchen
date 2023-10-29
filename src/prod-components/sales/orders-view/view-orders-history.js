import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import moment from 'moment';

import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import DatePicker from '@/assets/date-picker';

import apiRequest from '@/lib/axios';

const OrderListHistory = ({ currentPage, setCurrentPage, onEdit, calendarDate, setCalendarDate }) => {
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(true);

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
    enabled: !openCalendar,
    queryFn: () =>
      apiRequest({
        url: 'orders/search',
        method: 'POST',
        data: { dateFrom: moment(calendarDate).startOf('day'), dateTo: moment(calendarDate).endOf('day') },
      }).then((res) => res.data),
    onSuccess: (orders) => {
      summarizeReport(orders);
    },
  });

  useEffect(() => summarizeReport(orderQuery.data), []);

  const setCalendarHandler = (date) => {
    setCalendarDate(moment(date));
    setTimeout(() => {
      setOpenCalendar(false);
    }, 10);
  };

  return (
    <>
      <DatePicker open={openCalendar} close={() => setOpenCalendar(false)} onSave={setCalendarHandler} />
      <OrdersSideBar salesData={salesData} salesCount={salesCount} collectibleData={collectibleData} calendarDate={calendarDate} />
      <OrdersMainPage orderQuery={orderQuery} onEdit={onEdit} />
      <OrdersIconBar currentPage={currentPage} setCurrentPage={setCurrentPage} setOpenCalendar={setOpenCalendar} />
    </>
  );
};

export default OrderListHistory;
