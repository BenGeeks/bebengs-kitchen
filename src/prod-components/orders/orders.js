import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import FutureOrdersSideBar from './orders-side-bar';
import FutureOrdersList from './orders-list';

import apiRequest from '@/lib/axios';

import styles from './orders.module.css';

const FutureOrders = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [summary, setSummary] = useState({});
  const [viewDetails, setViewDetails] = useState(false);

  const onCancelHandler = () => {
    setViewDetails(false);
    setSelectedOrder(null);
  };

  function summarizeReport(data) {
    const result = {};
    // Loop through each order in the sampleData
    data.forEach((order) => {
      const deliveryDate = order.deliveryDate;
      const items = order.orderDetails.items;
      // Initialize an object for the current delivery date if it doesn't exist in the result
      if (!result[deliveryDate]) {
        result[deliveryDate] = [];
      }
      // Loop through the items in the order and update the quantity for each item
      items.forEach((item) => {
        const existingItem = result[deliveryDate].find((resultItem) => resultItem._id === item._id);

        if (existingItem) {
          existingItem.qty += item.qty;
        } else {
          result[deliveryDate].push({ _id: item._id, itemName: item.itemName, size: item.size, qty: item.qty });
        }
      });
    });
    return result;
  }

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

  const deleteHandler = (id) => {
    if (confirm(`Are you sure to DELETE this order?`) == true) {
      deleteOrderMutation.mutate(id);
    }
  };

  const viewOrderHandler = (order) => {
    setSelectedOrder(order);
    setViewDetails(true);
  };

  return (
    <div className={styles.super_container}>
      <ViewOrderDetailsModal
        open={viewDetails}
        close={onCancelHandler}
        orderDetails={selectedOrder}
        enableDelete={true}
        onDelete={deleteHandler}
      />
      <FutureOrdersSideBar futureOrdersQuery={futureOrdersQuery} summary={summary} />
      <FutureOrdersList futureOrdersQuery={futureOrdersQuery} onView={viewOrderHandler} />
    </div>
  );
};

export default FutureOrders;
