import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import ModalWide from '@/assets/modal-wide';
import apiRequest from '@/lib/axios';
import { ADDRESS_INPUT, ADDRESS_SCHEMA } from '@/resources/customers';
import styles from '../customer.module.css';

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
    <ModalWide open={open} close={close}>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>{isEdit ? 'Edit address:' : 'Add address:'}</h2>
        <div className={styles.modal_header_icon_container}>
          <div className={styles.modal_header_icon} onClick={close}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={styles.modal_body}>
        <ReactForm
          layout={ADDRESS_INPUT}
          schema={ADDRESS_SCHEMA}
          defaultValues={data}
          onSubmit={(data) => (isEdit ? editAddressMutation.mutate({ id: data._id, data: data }) : newAddressMutation.mutate(data))}
          onCancel={close}
          action={isEdit ? 'Edit' : 'Add'}
        />
      </div>
    </ModalWide>
  );
};

export default AddressNew;
