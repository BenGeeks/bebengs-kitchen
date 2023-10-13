'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiEditLine, RiDeleteBin4Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import styles from '@/assets/modal.module.css';
import styles2 from './menu.module.css';

import ReactForm from '@/assets/react-form';
import Variation from './variation/variation';
import apiRequest from '@/lib/axios';
import { MENU_INPUT, MENU_SCHEMA } from './resources';

const MenuViewModal = ({ onClose, id }) => {
  const queryClient = useQueryClient();
  const [onEdit, setOnEdit] = useState(false);

  const menuDataQuery = useQuery({
    queryKey: ['menu', id],
    queryFn: () => apiRequest({ url: `menu/${id}`, method: 'GET' }).then((res) => res.data),
  });

  const updateMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `menu/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Menu updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['menu', id] });
    },
  });

  const deleteMenuMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `menu/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Menu updated successfully.');
      queryClient.invalidateQueries({ queryKey: 'menu' });
    },
  });

  const onUpdateHandler = (formData) => {
    updateMenuMutation.mutate({
      id: formData._id,
      data: {
        item_name: formData.item_name,
        image_url: formData.image_url,
        description: formData.description,
      },
    });
    setOnEdit(false);
  };

  const deleteMenuHandler = (id) => {
    if (confirm('Are you sure you want to delete this menu item?') == true) {
      deleteMenuMutation.mutate(id);
      onClose();
    }
  };

  if (menuDataQuery.isLoading) return <h1>Loading...</h1>;
  if (menuDataQuery.isError) return <pre> {JSON.stringify(menuDataQuery.error)}</pre>;
  return (
    <div>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>View Menu Details</h2>
        <div className={styles.modal_header_icon_container}>
          {onEdit ? (
            <>
              <div className={styles.modal_header_icon} onClick={() => deleteMenuHandler(id)}>
                <RiDeleteBin4Line />
              </div>
              <div className={styles.modal_header_icon} onClick={() => setOnEdit(false)}>
                <RiCloseCircleLine />
              </div>
            </>
          ) : (
            <>
              <div className={styles.modal_header_icon} onClick={() => setOnEdit(true)}>
                <RiEditLine />
              </div>
              <div className={styles.modal_header_icon} onClick={onClose}>
                <RiCloseCircleLine />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.modal_body}>
        {onEdit ? (
          <ReactForm
            layout={MENU_INPUT}
            schema={MENU_SCHEMA}
            defaultValues={menuDataQuery.data.data}
            onSubmit={onUpdateHandler}
            onCancel={() => setOnEdit(false)}
          />
        ) : (
          <div className={styles2.big_card}>
            <img src={menuDataQuery.data.data.image_url} className={styles2.big_card_image} />
            <div className={styles2.big_card_text_container}>
              <h2 className={styles2.big_card_name}>{menuDataQuery.data.data.item_name}</h2>
              <p className={styles2.big_card_description}>{menuDataQuery.data.data.description}</p>
            </div>
          </div>
        )}
        <Variation menu_id={id} />
      </div>
    </div>
  );
};

export default MenuViewModal;
