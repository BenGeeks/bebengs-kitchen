'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Loader, Error } from '@/assets/loader-error';
import ActionModal from '@/assets/action-modal';
import { ADDRESS_HEADER } from '../resources';
import styles from '../customer.module.css';
import AddressNew from './address-new';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';

const AddressList = () => {
  const queryClient = useQueryClient();
  const [selectActionModal, setSelectActionModal] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const cancelHandler = () => {
    setAddressData(null);
    setSelectActionModal(false);
    setEditModal(false);
  };

  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `address/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Address deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['address'] });
      cancelHandler();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onDeleteHandler = () => {
    if (confirm('Are you sure you want to delete this address?') == true) {
      deleteAddressMutation.mutate(addressData._id);
    }
  };

  const onRowClick = (address) => {
    setAddressData(address);
    setSelectActionModal(true);
  };

  if (addressQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (addressQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={addressQuery.error} />
      </div>
    );

  return (
    <>
      {editModal && <AddressNew open={editModal} close={cancelHandler} isEdit={true} data={addressData} />}
      {selectActionModal && (
        <ActionModal
          name={addressData?.address}
          open={selectActionModal}
          close={() => setSelectActionModal(false)}
          onCancel={cancelHandler}
          onEdit={() => setEditModal(true)}
          onDelete={onDeleteHandler}
        />
      )}
      <div className={styles.page_container}>
        <div className={styles.main_page}>
          <div className={styles.header_bar}>
            <h3 className={styles.header_bar_title}>Address List:</h3>
          </div>
          <Table headers={ADDRESS_HEADER} data={addressQuery.data} enableRowClick={true} onRowClick={onRowClick} />
        </div>
      </div>
    </>
  );
};

export default AddressList;
