'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import { SCHEMA } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import modalStyles from '@/styles/modal.module.css';

const CustomerNew = ({ close }) => {
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
    { type: 'text', name: 'phone', label: 'G-cash number' },
    { type: 'text', name: 'address', label: 'Address', list: addressQuery.data },
    { type: 'number', name: 'block', label: 'Block' },
    { type: 'number', name: 'lot', label: 'Lot' },
  ];

  return (
    <>
      <div className={modalStyles.modal_header_bar}>
        <h2 className={modalStyles.modal_header_text}>Add customer:</h2>
        <div className={modalStyles.modal_header_icon_container}>
          <div className={modalStyles.modal_header_icon} onClick={close}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={modalStyles.modal_body}>
        <ReactForm layout={INPUT} schema={SCHEMA} onSubmit={(data) => newCustomerMutation.mutate(data)} onCancel={close} action="Add" />
      </div>
    </>
  );
};

export default CustomerNew;
