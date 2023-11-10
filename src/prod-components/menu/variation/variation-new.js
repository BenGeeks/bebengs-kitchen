'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { VARIATION_INPUT, VARIATION_SCHEMA, DEFAULT_VARIATION_DATA } from '../resources';
import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';

const NewVariation = ({ open, onCancel, menu }) => {
  const queryClient = useQueryClient();

  const newVariationMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'variations', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('A new variation item has been added successfully.');
      queryClient.invalidateQueries({ queryKey: ['variation'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const saveVariationHandler = (data) => {
    newVariationMutation.mutate({ ...data, menuId: menu?._id });
    onCancel();
  };
  return (
    <EditNewModal
      title={`Add new ${menu?.itemName} variation`}
      open={open}
      INPUT={VARIATION_INPUT}
      SCHEMA={VARIATION_SCHEMA}
      DEFAULT={DEFAULT_VARIATION_DATA}
      onSubmit={saveVariationHandler}
      onCancel={onCancel}
      action={'Add'}
    />
  );
};

export default NewVariation;
