'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import MenuViewModal from './menu-view-modal';
import MenuNewModal from './menu-new-modal';
import apiRequest from '@/lib/axios';

import styles from './menu.module.css';

const MenuList = () => {
  const DEFAULT_MENU_ITEM = { item_name: '', description: '', image: '', variation: [] };
  const [modalOpen, setModalOpen] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [action, setAction] = useState('');
  const [menuData, setMenuData] = useState(DEFAULT_MENU_ITEM);

  const menuQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'menu', method: 'GET' }).then((res) => res.data),
  });

  const onAddMenu = () => {
    setOpenNewModal(true);
  };

  const onViewMenu = (data) => {
    setModalOpen(true);
    setAction('View');
    setMenuData(data);
  };

  const onCancel = () => {
    setMenuData(DEFAULT_MENU_ITEM);
    setModalOpen(false);
  };

  if (menuQuery.isLoading) return <h1>Loading...</h1>;
  if (menuQuery.isError) return <pre> {JSON.stringify(menuQuery.error)}</pre>;
  return (
    <>
      <div className={styles.floating_icon} onClick={onAddMenu}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <MenuViewModal onClose={onCancel} action={action} data={menuData} id={menuData._id} />
      </Modal>
      <Modal open={openNewModal}>
        <MenuNewModal onClose={() => setOpenNewModal(false)} />
      </Modal>
      {menuQuery.data.data.map((item, index) => {
        return (
          <div key={index} className={styles.menu_cards_container}>
            <div className={styles.menu_card} onClick={() => onViewMenu(item)}>
              <img src={item.image_url} className={styles.menu_image} />
              <h3 className={styles.menu_card_name}>{item.item_name}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MenuList;
