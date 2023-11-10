'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { MENU_INPUT, MENU_SCHEMA } from './resources';
import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';

const EditMenu = ({ open, onCancel, menu }) => {
  const queryClient = useQueryClient();

  const updateMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `menu/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Menu updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      onCancel();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  return (
    <EditNewModal
      title={`Edit ${menu?.itemName} item`}
      open={open}
      INPUT={MENU_INPUT}
      SCHEMA={MENU_SCHEMA}
      DEFAULT={menu}
      onSubmit={(data) => updateMenuMutation.mutate({ id: data._id, data: data })}
      onCancel={onCancel}
      action={'Edit'}
    />
  );
};

export default EditMenu;
