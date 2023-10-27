'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import OrdersMainPage from './view-orders-main-page';
import OrdersIconBar from './view-orders-icon-bar';
import OrdersSideBar from './view-orders-side-bar';
import DatePicker from '@/assets/date-picker';

import apiRequest from '@/lib/axios';
import moment from 'moment';

const OrderListSearch = ({ setCurrentPage, onEdit }) => {
  const queryClient = useQueryClient();
  const [salesData, setSalesData] = useState({ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 });
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(moment());

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
        url: 'orders/search',
        method: 'POST',
        data: { dateFrom: moment(calendarDate).startOf('day'), dateTo: moment(calendarDate).endOf('day') },
      }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
    onSuccess: (orders) => {
      summarizeReport(orders);
    },
  });

  useEffect(() => summarizeReport(orderQuery.data), []);

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const statusUpdateHandler = (status) => {
    let orderData = orderQuery.data.filter((order) => order._id === status._id)[0];
    let updatedData = { ...orderData, ...status };
    updateOrderMutation.mutate({ id: status._id, data: updatedData });
  };

  const setCalendarHandler = (data) => {
    setCalendarDate(moment(data));
    setOpenCalendar(false);
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    orderQuery.refetch();
  };

  return (
    <>
      <DatePicker open={openCalendar} setOpenCalendar={setOpenCalendar} onSave={setCalendarHandler} />
      <OrdersSideBar salesData={salesData} salesCount={salesCount} collectibleData={collectibleData} calendarDate={calendarDate} />
      <OrdersMainPage orderQuery={orderQuery} statusUpdateHandler={statusUpdateHandler} onEdit={onEdit} />
      <OrdersIconBar setCurrentPage={setCurrentPage} setOpenCalendar={setOpenCalendar} setCalendarDate={setCalendarDate} />
    </>
  );
};

export default OrderListSearch;
