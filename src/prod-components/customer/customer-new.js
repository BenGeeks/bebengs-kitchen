'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import { INPUT, SCHEMA } from '@/resources/customers';
import apiRequest from '@/lib/axios';
import modalStyles from '@/styles/modal.module.css';

const CustomerNew = ({ close, onAddCustomerSuccess }) => {
  const queryClient = useQueryClient();

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

  if (newCustomerMutation.isLoading) return <LoadingPage />;
  if (newCustomerMutation.isError) return <ErrorPage error={JSON.stringify(newCustomerMutation.error)} />;

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
