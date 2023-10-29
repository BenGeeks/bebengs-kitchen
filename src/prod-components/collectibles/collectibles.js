import React, { useState } from 'react';
import moment from 'moment';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import CollectibleList from './collectible-list';
import CollectibleSideBar from './collectible-side-bar';
import CollectibleIconBar from './collectible-icon-bar';
import DatePicker from '@/assets/date-picker';
import apiRequest from '@/lib/axios';

const Collectibles = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const collectiblesQuery = useQuery({
    queryKey: ['collectibles'],
    queryFn: () =>
      apiRequest({
        url: 'orders/collectibles',
        method: 'POST',
        data: { dateToday: moment().startOf('day') },
      }).then((res) => res.data),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['collectibles', 'orders'] });
      setOpenDatePicker(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });
  const onPaidHandler = (date) => {
    if (confirm(`Are you sure this collectible has been paid?`) == true) {
      updateOrderMutation.mutate({ id: selectedOrder._id, data: { ...selectedOrder, isPaid: true, paymentDate: moment(date) } });
      console.log('ON PAID HANDLER HAS BEEN TRIGGERED!');
    }
  };

  return (
    <>
      <DatePicker open={openDatePicker} close={() => setOpenDatePicker(false)} onSave={onPaidHandler} />
      <CollectibleSideBar selectedOrder={selectedOrder} />
      <CollectibleList collectiblesQuery={collectiblesQuery} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      <CollectibleIconBar selectedOrder={selectedOrder} onPaid={() => setOpenDatePicker(true)} />
    </>
  );
};

export default Collectibles;
