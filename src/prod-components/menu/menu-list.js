'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import MenuModal from './menu-modal';
import Card from '@/assets/card';

import styles from '@/styles/prod.module.css';

import { DATA } from './resources';

const MenuPage = () => {
  const initialState = { item: '', size: '', price: '' };
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [menuData, setMenuData] = useState(initialState);
  const [currentPage, setCurrentPage] = useState('today');

  const onAddMenu = () => {
    setMenuData(initialState);
    setAction('Add new');
    setModalOpen(true);
  };

  const onViewMenu = (data) => {
    setModalOpen(true);
    setAction('View');
    setMenuData(data);
  };

  const onCancel = () => {
    setMenuData(initialState);
    setModalOpen(false);
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <div className={styles.page_nav_container}>
          <div className={currentPage === 'today' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('today')}>
            Today
          </div>
          <div className={currentPage === 'menu' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('menu')}>
            List
          </div>
        </div>

        <div className={styles.header_button} onClick={onAddMenu}>
          <RiAddCircleLine />
        </div>
      </div>

      {currentPage === 'menu' && (
        <>
          <Modal open={modalOpen}>
            <MenuModal onClose={onCancel} action={action} data={menuData} />
          </Modal>
          <Card data={DATA ? DATA : []} size="small" onSelect={onViewMenu} />
        </>
      )}
    </div>
  );
};

export default MenuPage;
