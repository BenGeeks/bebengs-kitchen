'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiCloseCircleLine } from 'react-icons/ri';

import ReactForm from '@/assets/react-form';
import apiRequest from '@/lib/axios';
import styles from '@/assets/modal.module.css';
import { MENU_INPUT, MENU_SCHEMA, DEFAULT_MENU_ITEM } from './resources';

const MenuNewModal = ({ onClose }) => {
  const queryClient = useQueryClient();

  const newMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'menu', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('A new menu item has been added successfully.');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });

  const addNewMenuHandler = (data) => {
    console.log(data);
    newMenuMutation.mutate(data);
    onClose();
  };
  return (
    <>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>Add new menu:</h2>
        <div className={styles.modal_header_icon} onClick={onClose} title="close">
          <RiCloseCircleLine />
        </div>
      </div>
      <div className={styles.modal_body}>
        <ReactForm
          layout={MENU_INPUT}
          schema={MENU_SCHEMA}
          defaultValues={DEFAULT_MENU_ITEM}
          onSubmit={addNewMenuHandler}
          onCancel={onClose}
          action={'Add'}
        />
      </div>
    </>
  );
};

export default MenuNewModal;
