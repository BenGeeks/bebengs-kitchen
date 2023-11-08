'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import ModalWide from '@/assets/modal-wide';
import apiRequest from '@/lib/axios';
import { SCHEMA } from '@/resources/customers';
import assetStyles from '@/styles/assets.module.css';

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
    { type: 'text', name: 'phone', label: 'G-cash number' },
    { type: 'text', name: 'address', label: 'Address', list: addressQuery.data },
    { type: 'number', name: 'block', label: 'Block' },
    { type: 'number', name: 'lot', label: 'Lot' },
  ];

  return (
    <ModalWide open={open} close={close}>
      <div className={assetStyles.modal_header_bar}>
        <h2 className={assetStyles.modal_header_text}>Add customer:</h2>
        <div className={assetStyles.modal_header_icon_container}>
          <div className={assetStyles.modal_header_icon} onClick={close}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={assetStyles.modal_body}>
        <ReactForm
          layout={INPUT}
          schema={SCHEMA}
          defaultValues={customer}
          onSubmit={(data) => editCustomerMutation.mutate({ id: data._id, data: data })}
          onCancel={close}
          action="Add"
        />
      </div>
    </ModalWide>
  );
};

export default CustomerEdit;
