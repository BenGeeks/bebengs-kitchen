import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import apiRequest from '@/lib/axios';
import { VARIATION_INPUT, VARIATION_SCHEMA, DEFAULT_VARIATION_DATA } from '@/resources/menu';

const NewVariation = ({ onCancel, menu_id }) => {
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
    newVariationMutation.mutate({ ...data, menu_id });
    onCancel();
  };
  return (
    <ReactForm
      layout={VARIATION_INPUT}
      schema={VARIATION_SCHEMA}
      defaultValues={DEFAULT_VARIATION_DATA}
      onSubmit={saveVariationHandler}
      onCancel={onCancel}
      action={'Add'}
    />
  );
};

export default NewVariation;
