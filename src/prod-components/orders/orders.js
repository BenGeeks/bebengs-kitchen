import { useQuery } from '@tanstack/react-query';
import apiRequest from '@/lib/axios';
import moment from 'moment';

import FutureOrdersSideBar from './orders-side-bar';
import FutureOrdersList from './orders-list';
import { useState } from 'react';

const FutureOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState();

  const futureOrdersQuery = useQuery({
    queryKey: ['future_orders'],
    queryFn: () =>
      apiRequest({
        url: 'orders/orders',
        method: 'POST',
        data: { dateToday: moment().endOf('day') },
      }).then((res) => res.data),
  });

  return (
    <>
      <FutureOrdersSideBar selectedOrder={selectedOrder} futureOrdersQuery={futureOrdersQuery} />
      <FutureOrdersList setSelectedOrder={setSelectedOrder} futureOrdersQuery={futureOrdersQuery} />
    </>
  );
};

export default FutureOrders;
