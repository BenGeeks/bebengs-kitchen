'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import EditNewModal from '@/assets/edit-new-modal';
import { SCHEMA } from './resources';
import apiRequest from '@/lib/axios';

const CustomerNew = ({ open, close, onAddCustomerSuccess }) => {
  const queryClient = useQueryClient();

  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
  });

  const newCustomerMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'customers', method: 'POST', data: payload }),
    onSuccess: (response) => {
      onAddCustomerSuccess(response.data);
      toast.success('Customer added successfully.');
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
      title={'Add customer'}
      open={open}
      INPUT={INPUT}
      SCHEMA={SCHEMA}
      onSubmit={(data) => newCustomerMutation.mutate(data)}
      onCancel={close}
      action={'Add'}
    />
  );
};

export default CustomerNew;
