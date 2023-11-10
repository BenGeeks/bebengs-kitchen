'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { ADDRESS_INPUT, ADDRESS_SCHEMA } from '../resources';
import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';

const AddressNew = ({ open, close, isEdit, data }) => {
  const queryClient = useQueryClient();

  const newAddressMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'address', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('Address added successfully.');
      queryClient.invalidateQueries({ queryKey: ['address'] });
      close();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const editAddressMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `address/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Address updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['address'] });
      close();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  return (
    <EditNewModal
      title={isEdit ? 'Edit address:' : 'Add address:'}
      open={open}
      INPUT={ADDRESS_INPUT}
      SCHEMA={ADDRESS_SCHEMA}
      DEFAULT={data}
      onSubmit={(data) => (isEdit ? editAddressMutation.mutate({ id: data._id, data: data }) : newAddressMutation.mutate(data))}
      onCancel={close}
      action={isEdit ? 'Edit' : 'Add'}
    />
  );
};

export default AddressNew;
