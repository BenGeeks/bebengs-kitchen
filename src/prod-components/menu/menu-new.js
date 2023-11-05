import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';
import { MENU_INPUT, MENU_SCHEMA, DEFAULT_MENU_ITEM } from '@/resources/menu';

const NewMenu = ({ open, onCancel }) => {
  const queryClient = useQueryClient();

  const newMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'menu', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('A new menu item has been added successfully.');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      onCancel();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  return (
    <EditNewModal
      title={`Add new Menu item`}
      open={open}
      INPUT={MENU_INPUT}
      SCHEMA={MENU_SCHEMA}
      DEFAULT={DEFAULT_MENU_ITEM}
      onSubmit={(data) => newMenuMutation.mutate(data)}
      onCancel={onCancel}
      action={'Add'}
    />
  );
};

export default NewMenu;
