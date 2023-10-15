'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiEditLine, RiDeleteBin4Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

import ReactForm from '@/assets/react-form';
import Variation from './variation/variation';
import apiRequest from '@/lib/axios';
import { MENU_INPUT, MENU_SCHEMA } from '@/resources/menu';
import modalStyles from '@/styles/modal.module.css';
import cardStyles from '@/styles/card.module.css';

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
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteMenuMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `menu/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Menu deleted successfully.');
      queryClient.invalidateQueries({ queryKey: 'menu' });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onUpdateHandler = (formData) => {
    updateMenuMutation.mutate({
      id: formData._id,
      data: {
        itemName: formData.itemName,
        imageUrl: formData.imageUrl,
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
      <div className={modalStyles.modal_header_bar}>
        <h2 className={modalStyles.modal_header_text}>View Menu Details</h2>
        <div className={modalStyles.modal_header_icon_container}>
          {onEdit ? (
            <>
              <div className={modalStyles.modal_header_icon} onClick={() => deleteMenuHandler(id)}>
                <RiDeleteBin4Line />
              </div>
              <div className={modalStyles.modal_header_icon} onClick={() => setOnEdit(false)}>
                <RiCloseCircleLine />
              </div>
            </>
          ) : (
            <>
              <div className={modalStyles.modal_header_icon} onClick={() => setOnEdit(true)}>
                <RiEditLine />
              </div>
              <div className={modalStyles.modal_header_icon} onClick={onClose}>
                <RiCloseCircleLine />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={modalStyles.modal_body}>
        {onEdit ? (
          <ReactForm
            layout={MENU_INPUT}
            schema={MENU_SCHEMA}
            defaultValues={menuDataQuery.data}
            onSubmit={onUpdateHandler}
            onCancel={() => setOnEdit(false)}
          />
        ) : (
          <div className={cardStyles.big_card}>
            <img src={menuDataQuery.data.imageUrl} className={cardStyles.big_card_image} />
            <div className={cardStyles.big_card_text_container}>
              <h2 className={cardStyles.big_card_name}>{menuDataQuery.data.itemName}</h2>
              <p className={cardStyles.big_card_description}>{menuDataQuery.data.description}</p>
            </div>
          </div>
        )}
        <Variation menu_id={id} />
      </div>
    </div>
  );
};

export default MenuViewModal;