'use client';
import { useEffect, useState } from 'react';
import { RiCloseCircleLine, RiEditLine, RiAddCircleLine } from 'react-icons/ri';
import styles from '@/assets/modal.module.css';

import ReactForm from '@/assets/react-form';
import ReactTable from '@/assets/react-table';
import Card from '@/assets/card';
import Modal2 from '@/assets/Modal2';
import { MENU_INPUT, MENU_SCHEMA, VARIATION_INPUT, VARIATION_SCHEMA, VARIATION_COLUMNS } from './resources';

const MenuModal = ({ action, onClose, data }) => {
  const DEFAULT_VARIATION = { size: '', qty: 1, price: 0 };
  const [modalOpen, setModalOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentData, setCurrentData] = useState(data ? data : {});
  const [editVariation, setEditVariation] = useState(false);
  const [currentVariation, setCurrentVariation] = useState(DEFAULT_VARIATION);

  const onSubmitHandler = (formData) => {
    console.log(formData);
    setOnEdit(false);
  };

  const onDeleteVariation = (id) => {
    if (confirm('Confirm delete menu item?') == true) {
      let tempData = currentData.variation.filter((variation) => variation.id !== id);
      setCurrentData({ ...currentData, variation: tempData });
    }
  };

  const onEditVariation = (data) => {
    setCurrentVariation(data);
    setEditVariation(true);
    setModalOpen(true);
  };

  const onCancelVariationEdit = () => {
    setCurrentVariation(DEFAULT_VARIATION);
    setEditVariation(false);
    setModalOpen(false);
  };

  const onSaveVariation = (data) => {
    let tempData = currentData.variation.filter((variation) => variation.id !== data.id);
    setCurrentData({ ...currentData, variation: [...tempData, data] });
    setEditVariation(false);
    setModalOpen(false);
  };

  const onAddVariation = () => {
    let temp = { ...DEFAULT_VARIATION, id: Date.now() };
    setCurrentVariation(temp);
    setEditVariation(true);
    setModalOpen(true);
  };

  return (
    <div>
      <Modal2 open={modalOpen}>
        <ReactForm
          layout={VARIATION_INPUT}
          schema={VARIATION_SCHEMA}
          defaultValues={currentVariation}
          onSubmit={onSaveVariation}
          onCancel={onCancelVariationEdit}
        />
      </Modal2>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>{`${action} menu:`}</h2>
        {onEdit ? (
          <div className={styles.modal_header_icon} onClick={() => setOnEdit(false)}>
            <RiCloseCircleLine />
          </div>
        ) : (
          <div className={styles.modal_header_icon_container}>
            <div className={styles.modal_header_icon} onClick={() => setOnEdit(true)}>
              <RiEditLine />
            </div>
            <div className={styles.modal_header_icon} onClick={onClose}>
              <RiCloseCircleLine />
            </div>
          </div>
        )}
      </div>

      <div className={styles.modal_body}>
        {onEdit ? (
          <ReactForm
            layout={MENU_INPUT}
            schema={MENU_SCHEMA}
            defaultValues={data}
            onSubmit={onSubmitHandler}
            action={action}
            onCancel={() => setOnEdit(false)}
          />
        ) : (
          <Card data={data} solo={true} option="big" />
        )}
        <div className={styles.modal_sub_header}>
          <h3 className={styles.modal_sub_header_text}>Variations</h3>
          <div className={styles.modal_sub_header_icon} onClick={onAddVariation}>
            <RiAddCircleLine />
          </div>
        </div>
        {!editVariation && (
          <ReactTable
            COLUMNS={VARIATION_COLUMNS}
            DATA={currentData.variation}
            onDelete={onDeleteVariation}
            onEdit={onEditVariation}
            enableActions={true}
          />
        )}
      </div>
    </div>
  );
};

export default MenuModal;
