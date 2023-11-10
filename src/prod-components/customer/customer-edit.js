'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import EditNewModal from '@/assets/edit-new-modal';
import { SCHEMA } from './resources';
import apiRequest from '@/lib/axios';

const CustomerEdit = ({ open, close, customer }) => {
  const queryClient = useQueryClient();

  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
  });

  const editCustomerMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `customers/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Customer updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      close();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const INPUT = [
    { type: 'text', name: 'name', label: 'Name' },
    { type: 'text', name: 'address', label: 'Address', list: addressQuery.data },
    { type: 'number', name: 'block', label: 'Block' },
    { type: 'number', name: 'lot', label: 'Lot' },
  ];

  return (
    <EditNewModal
      title={`Edit customer ${customer.name}`}
      open={open}
      INPUT={INPUT}
      SCHEMA={SCHEMA}
      DEFAULT={customer}
      onSubmit={(data) => editCustomerMutation.mutate({ id: data._id, data: data })}
      onCancel={close}
      action={'Edit'}
    />
  );
};

export default CustomerEdit;
