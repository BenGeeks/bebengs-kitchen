import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiAddCircleLine, RiEditLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import Table from '@/assets/table';
import ActionModal from '@/assets/action-modal';
import EditVariation from './variation/variation-edit';
import NewVariation from './variation/variation-new';
import { VARIATION_HEADERS } from '@/resources/menu';
import apiRequest from '@/lib/axios';
import menuStyles from '@/styles/menu.module.css';

const MenuSideBar = ({ isHalf, selectedMenu, setSelectedMenu, variationQuery, actionModal }) => {
  const queryClient = useQueryClient();
  const [openAction, setOpenAction] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [newVariation, setNewVariation] = useState(false);
  const [editVariation, setEditVariation] = useState(false);

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

  return (
    <>
      <ActionModal
        name={`${selectedMenu?.itemName} ${selectedVariation?.size}`}
        open={openAction}
        close={() => setOpenAction(false)}
        onCancel={cancelHandler}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
      <EditVariation open={editVariation} onCancel={cancelHandler} menu={selectedMenu} variation={selectedVariation} />
      <NewVariation open={newVariation} onCancel={cancelHandler} menu={selectedMenu} />

      <div className={isHalf ? menuStyles.page_container_half : menuStyles.page_container_closed}>
        <div className={menuStyles.main_page}>
          <div className={menuStyles.header_bar}>
            <h3 className={menuStyles.header_bar_title}>{selectedMenu?.itemName}</h3>
            <div className={menuStyles.icons_container}>
              <div className={menuStyles.small_icon} onClick={actionModal}>
                <RiEditLine />
              </div>
              <div className={menuStyles.small_icon} onClick={() => setSelectedMenu(null)}>
                <RiCloseCircleLine />
              </div>
            </div>
          </div>
          <div className={menuStyles.image_container}>
            <img className={menuStyles.thumbnail} src="/images/jabe_value_meal.jpeg" alt="Menu image" />
          </div>
          <div className={menuStyles.header_bar}>
            <h3 className={menuStyles.header_bar_title}>Variations:</h3>
            <div className={menuStyles.icons_container}>
              <div className={menuStyles.small_icon} onClick={() => setNewVariation(true)}>
                <RiAddCircleLine />
              </div>
            </div>
          </div>
          <Table
            headers={VARIATION_HEADERS}
            data={variationQuery}
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
