'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import MenuListModal from './menu-list-modal';
import Card from '@/assets/card';

import styles from './menu.module.css';

import { DATA } from './resources';

const MenuList = () => {
  const DEFAULT_MENU_ITEM = { item_name: '', description: '', image: '', variation: [] };
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [menuData, setMenuData] = useState(DEFAULT_MENU_ITEM);

  const onAddMenu = () => {
    setMenuData(DEFAULT_MENU_ITEM);
    setAction('Add');
    setModalOpen(true);
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

  return (
    <>
      <div className={styles.floating_icon} onClick={onAddMenu}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <MenuListModal onClose={onCancel} action={action} data={menuData} />
      </Modal>
      <Card data={DATA ? DATA : []} size="small" onSelect={onViewMenu} />
    </>
  );
};

export default MenuList;
