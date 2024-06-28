'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiAddCircleLine, RiEditLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import EditVariation from './variation/variation-edit';
import { Loader, Error } from '@/assets/loader-error';
import NewVariation from './variation/variation-new';
import ActionModal from '@/assets/action-modal';
import { VARIATION_HEADERS } from './resources';
import styles from './menu.module.css';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';

const MenuSideBar = ({ width, selectedMenu, setSelectedMenu, variationQuery, actionModal }) => {
  const queryClient = useQueryClient();
  const [openAction, setOpenAction] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [newVariation, setNewVariation] = useState(false);
  const [editVariation, setEditVariation] = useState(false);

  console.log('SELECTED MENU: ', selectedMenu);

  const deleteVariationMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `variations/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Successfully delete a variation.');
      queryClient.invalidateQueries({ queryKey: ['variation'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const cancelHandler = () => {
    setSelectedVariation(null);
    setNewVariation(false);
    setOpenAction(false);
    setEditVariation(false);
  };

  const editHandler = () => {
    setNewVariation(false);
    setOpenAction(false);
    setEditVariation(true);
  };

  const deleteHandler = () => {
    deleteVariationMutation.mutate(selectedVariation._id);
    cancelHandler();
  };

  const rowSelectHandler = (rowItem) => {
    setSelectedVariation(rowItem);
    setOpenAction(true);
  };

  if (variationQuery.isLoading)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Loader />
      </div>
    );

  if (variationQuery.isError)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Error error={variationQuery.error} />
      </div>
    );

  return (
    <>
      {openAction && (
        <ActionModal
          name={`${selectedMenu?.itemName} ${selectedVariation?.size}`}
          open={openAction}
          close={() => setOpenAction(false)}
          onCancel={cancelHandler}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      )}
      {editVariation && <EditVariation open={editVariation} onCancel={cancelHandler} menu={selectedMenu} variation={selectedVariation} />}
      {newVariation && <NewVariation open={newVariation} onCancel={cancelHandler} menu={selectedMenu} />}

      <div className={styles.page_container} style={{ width: width }}>
        <div className={styles.main_page}>
          <div className={styles.header_bar}>
            <h3 className={styles.header_bar_title}>{selectedMenu?.itemName}</h3>
            <div className={styles.icons_container}>
              <div className={styles.small_icon} onClick={actionModal}>
                <RiEditLine />
              </div>
              <div className={styles.small_icon} onClick={() => setSelectedMenu(null)}>
                <RiCloseCircleLine />
              </div>
            </div>
          </div>
          <div className={styles.image_container}>
            <img
              className={styles.thumbnail}
              src={selectedMenu?.imageUrl ? selectedMenu?.imageUrl : '/images/resources/orange_travelpictdinner.png'}
              alt="Menu image"
            />
          </div>
          <div className={styles.header_bar}>
            <h3 className={styles.header_bar_title}>Variations:</h3>
            <div className={styles.icons_container}>
              <div className={styles.small_icon} onClick={() => setNewVariation(true)}>
                <RiAddCircleLine />
              </div>
            </div>
          </div>
          <Table
            headers={VARIATION_HEADERS}
            data={variationQuery.data}
            enableDelete={false}
            enableEdit={false}
            enableRowClick={true}
            onRowClick={rowSelectHandler}
          />
        </div>
      </div>
    </>
  );
};

export default MenuSideBar;
