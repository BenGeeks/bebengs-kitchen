'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import FutureOrdersMainPage from './orders-main';

import EditOrderPage from '../sales/new-order/edit-order';
import NewOrderPage from '../sales/new-order/new-order';

import { summarizeReport } from './resources';

import apiRequest from '@/lib/axios';

const FutureOrders = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState('orders-list');
  const [orderData, setOrderData] = useState(null);
  const [summary, setSummary] = useState({});
  const [viewDetails, setViewDetails] = useState(false);

  const onCancelHandler = () => {
    setViewDetails(false);
    setSelectedOrder(null);
  };

  const futureOrdersQuery = useQuery({
    queryKey: ['future_orders'],
    queryFn: () =>
      apiRequest({
        url: 'orders/orders',
        method: 'POST',
        data: { dateToday: moment().endOf('day') },
      }).then((res) => res.data),
    onSuccess: (orders) => {
      setSummary(summarizeReport(orders));
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `orders/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Order deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['future_orders'] });
      onCancelHandler();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteOrderHandler = (id) => {
    if (confirm(`Are you sure to DELETE this order?`) == true) {
      deleteOrderMutation.mutate(id);
    }
  };

  const viewOrderHandler = (order) => {
    setSelectedOrder(order);
    setViewDetails(true);
  };

  const editOrderHandler = (order) => {
    setOrderData(order);
    setCurrentPage('edit-order');
    setViewDetails(false);
  };

  return (
    <>
      {viewDetails && (
        <ViewOrderDetailsModal
          open={viewDetails}
          close={onCancelHandler}
          orderDetails={selectedOrder}
          enableDelete={true}
          enableEdit={true}
          onDelete={deleteOrderHandler}
          onEdit={editOrderHandler}
        />
      )}

      {currentPage === 'orders-list' && (
        <FutureOrdersMainPage
          futureOrdersQuery={futureOrdersQuery}
          onView={viewOrderHandler}
          setCurrentPage={setCurrentPage}
          setOrderData={setOrderData}
          summary={summary}
        />
      )}
      {currentPage === 'edit-order' && <EditOrderPage orderData={orderData} setCurrentPage={setCurrentPage} isFutureOrder={true} />}
      {currentPage === 'new-order' && <NewOrderPage setCurrentPage={setCurrentPage} isFutureOrder={true} />}
    </>
  );
};

export default FutureOrders;
