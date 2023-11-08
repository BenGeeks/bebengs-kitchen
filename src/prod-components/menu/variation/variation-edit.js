'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';
import { VARIATION_INPUT, VARIATION_SCHEMA } from '@/resources/menu';

const EditVariation = ({ open, onCancel, menu, variation }) => {
  const queryClient = useQueryClient();

  const updateVariationMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `variations/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Successfully updated.');
      queryClient.invalidateQueries({ queryKey: ['variation'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const saveVariationHandler = (data) => {
    updateVariationMutation.mutate({ id: data._id, data: data });
    onCancel();
  };
  return (
    <EditNewModal
      title={`Edit ${menu?.itemName} ${variation?.size} variation`}
      open={open}
      INPUT={VARIATION_INPUT}
      SCHEMA={VARIATION_SCHEMA}
      DEFAULT={variation}
      onSubmit={saveVariationHandler}
      onCancel={onCancel}
      action={'Edit'}
    />
  );
};

export default EditVariation;
