'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiEditLine, RiAddCircleLine } from 'react-icons/ri';
import styles from '@/assets/modal.module.css';
import styles2 from './menu.module.css';

import ReactForm from '@/assets/react-form';
import Table from '@/assets/table';
import Modal2 from '@/assets/Modal2';
import apiRequest from '@/lib/axios';
import { MENU_INPUT, MENU_SCHEMA, VARIATION_INPUT, VARIATION_SCHEMA, VARIATION_HEADERS } from './resources';

const MenuListModal = ({ action, onClose, data, id }) => {
  const queryClient = useQueryClient();
  const DEFAULT_VARIATION = { size: '', qty: 1, price: 0 };
  const [modalOpen, setModalOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onAddNew, setOnAddNew] = useState(false);
  const [currentData, setCurrentData] = useState(data);
  const [editVariation, setEditVariation] = useState(false);
  const [currentVariation, setCurrentVariation] = useState(DEFAULT_VARIATION);
  const [action2, setAction2] = useState('');
  console.log('ID: ', id);

  const menuDataQuery = useQuery({
    queryKey: [id],
    queryFn: () => apiRequest({ url: `menu/${id}`, method: 'GET' }).then((res) => res.data),
  });

  const newMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'menu', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('Customer added successfully.');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });

  const updateMenuMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `menu/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Menu updated successfully.');
      queryClient.invalidateQueries({ queryKey: [id] });
    },
  });

  useEffect(() => {
    if (action === 'Add new') {
      setCurrentVariation(DEFAULT_VARIATION);
      setOnAddNew(true);
    }
  }, [action]);

  const onUpdateHandler = (formData) => {
    updateMenuMutation.mutate({
      id: formData._id,
      data: {
        item_name: formData.item_name,
        image_url: formData.image_url,
        description: formData.description,
        variation: formData.variation,
      },
    });
    setOnEdit(false);
    setOnAddNew(false);
  };

  const onSaveHandler = (formData) => {
    setCurrentData({ ...formData, variation: [] });
    newMenuMutation.mutate({ ...formData, variation: [] });
    console.log(formData);
    setOnAddNew(false);
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
    setAction2('Edit');
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
    setAction2('Add');
    setModalOpen(true);
  };

  if (menuDataQuery.isLoading) return <h1>Loading...</h1>;

  if (menuDataQuery.isError) return <pre> {JSON.stringify(menuDataQuery.error)}</pre>;

  console.log('MENU DATA QUERY: ', menuDataQuery.data.data.variation);
  return (
    <div>
      <Modal2 open={modalOpen}>
        <ReactForm
          layout={VARIATION_INPUT}
          schema={VARIATION_SCHEMA}
          defaultValues={currentVariation}
          action={action2}
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
        {onEdit || onAddNew ? (
          <ReactForm
            layout={MENU_INPUT}
            schema={MENU_SCHEMA}
            defaultValues={currentData}
            onSubmit={onAddNew ? onSaveHandler : onUpdateHandler}
            action={action}
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
        {!onAddNew && (
          <div className={styles.modal_sub_header}>
            <h3 className={styles.modal_sub_header_text}>Variations</h3>
            <div className={styles.modal_sub_header_icon} onClick={onAddVariation}>
              <RiAddCircleLine />
            </div>
          </div>
        )}

        {!editVariation && (
          <Table
            headers={VARIATION_HEADERS}
            data={menuDataQuery.data.data.variation}
            onDelete={onDeleteVariation}
            onEdit={onEditVariation}
            enableActions={true}
          />
        )}
      </div>
    </div>
  );
};

export default MenuListModal;
