'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import SideBar from './side-bar';
import OrderMainPage from './main-page';

import apiRequest from '@/lib/axios';

const Orders = () => {
  const queryClient = useQueryClient();
  const [salesData, setSalesData] = useState([{ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 }]);
  const [salesCount, setSalesCount] = useState([]);
  const [collectibleData, setCollectibleData] = useState([{ cashTotal: 0, gCashTotal: 0, dailyTotal: 0 }]);
  const [collectibleCount, setCollectibleCount] = useState([]);
  const [onAdd, setOnAdd] = useState(false);
  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [viewReport, setViewReport] = useState(false);

  const summarizeReport = (sales) => {
    let tempArray = [];
    let summary = {};
    let cash = 0;
    let gCash = 0;
    let tempArrayCollectible = [];
    let summaryCollectible = {};
    let cashCollectible = 0;
    let gCashCollectible = 0;
    sales.forEach((order) => {
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
      } else {
        if (order.isGcash) gCashCollectible = gCashCollectible + order.total;
        if (!order.isGcash) cashCollectible = cashCollectible + order.total;
        order.orderDetails.items.forEach((item) => {
          if (summaryCollectible[item._id]) {
            summaryCollectible[item._id] = { ...item, qty: summaryCollectible[item._id].qty + item.qty };
          } else {
            summaryCollectible[item._id] = item;
          }
        });
      }
    });
    const keys = Object.keys(summary);
    keys.forEach((key) => {
      tempArray.push(summary[key]);
    });
    setSalesCount(tempArray);

    const keysCollectible = Object.keys(summaryCollectible);
    keysCollectible.forEach((key) => {
      tempArrayCollectible.push(summaryCollectible[key]);
    });
    setCollectibleCount(tempArrayCollectible);

    setSalesData([{ cashTotal: cash, gCashTotal: gCash, dailyTotal: cash + gCash }]);
    setCollectibleData([{ cashTotal: cashCollectible, gCashTotal: gCashCollectible, dailyTotal: cashCollectible + gCashCollectible }]);
  };

  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiRequest({ url: 'orders/today', method: 'GET' }).then((res) => res.data),
    staleTime: 20000,
    refetchInterval: 20000,
    onSuccess: (orders) => {
      summarizeReport(orders);
    },
  });

  const newOrderMutation = useMutation({
    mutationFn: (data) => apiRequest({ url: `orders`, method: 'POST', data: data }),
    onSuccess: () => {
      toast.success('Order added successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

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

  const onSaveHandler = (newData) => {
    newOrderMutation.mutate(newData);
    setOnAdd(false);
  };

  const statusUpdateHandler = (status) => {
    let orderData = orderQuery.data.filter((order) => order._id === status._id)[0];
    let updatedData = { ...orderData, isDelivered: status.isDelivered, isPaid: status.isPaid, isGcash: status.isGcash };
    updateOrderMutation.mutate({ id: status._id, data: updatedData });
  };

  const onUpdateHandler = (updatedData) => {
    updateOrderMutation.mutate(updatedData);
  };

  const veiwOrderHandler = (data) => {
    setViewData(data);
    setViewModal(true);
  };

  return (
    <>
      <SideBar
        salesData={salesData}
        salesCount={salesCount}
        collectibleData={collectibleData}
        collectibleCount={collectibleCount}
        viewReport={viewReport}
      />
      <OrderMainPage
        orderQuery={orderQuery}
        onSaveHandler={onSaveHandler}
        statusUpdateHandler={statusUpdateHandler}
        onUpdateHandler={onUpdateHandler}
        veiwOrderHandler={veiwOrderHandler}
        onAdd={onAdd}
        setOnAdd={setOnAdd}
        viewData={viewData}
        viewModal={viewModal}
        setViewModal={setViewModal}
        viewReport={viewReport}
        setViewReport={setViewReport}
      />
    </>
  );
};

export default Orders;
