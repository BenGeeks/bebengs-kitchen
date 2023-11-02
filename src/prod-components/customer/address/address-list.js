import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ModalWide from '@/assets/modal-wide';
import AddressNew from './address-new';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';

import { ADDRESS_HEADER } from '@/resources/customers';
import customerStyles from '@/styles/customer.module.css';

const AddressList = () => {
  const queryClient = useQueryClient();
  const [addressData, setAddressData] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `address/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Address deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onDeleteHandler = (id) => {
    if (confirm('Are you sure you want to delete this address?') == true) {
      deleteAddressMutation.mutate(id);
    }
  };

  const onEditHandler = (address) => {
    setAddressData(address);
    setEditModal(true);
  };

  return (
    <>
      <ModalWide open={editModal} close={() => setEditModal(false)}>
        <AddressNew close={() => setEditModal(false)} isEdit={true} data={addressData} />
      </ModalWide>

      <div className={customerStyles.page_container}>
        <div className={customerStyles.main_page}>
          <div className={customerStyles.header_bar}>
            <h3 className={customerStyles.header_bar_title}>Address List:</h3>
          </div>

          <Table
            headers={ADDRESS_HEADER}
            data={addressQuery.data}
            enableDelete={true}
            onDelete={onDeleteHandler}
            enableEdit={true}
            onEdit={onEditHandler}
            enableRowClick={false}
            isLoading={addressQuery?.isLoading}
            isError={addressQuery?.isError}
          />
        </div>
      </div>
    </>
  );
};

export default AddressList;
