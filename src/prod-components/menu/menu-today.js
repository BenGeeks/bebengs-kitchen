import React, { useState } from 'react';

import Modal from '@/assets/modal';
import MenuTodayModal from './menu-today-modal';
import Card from '@/assets/card';

import { RiAddCircleLine } from 'react-icons/ri';
import styles from './menu.module.css';

const MenuToday = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dailyList, setDailyList] = useState([]);

  const onAddDailyMenu = () => {
    setModalOpen(true);
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const onSelect = (data) => {
    if (confirm('Confirm delete menu item?') == true) {
      let tempData = [...dailyList];
      tempData = tempData.filter((el) => el.id !== data.id);
      setDailyList(tempData);
    }
  };

  const onSaveHandler = (data) => {
    let tempData = [...dailyList];
    data.forEach((el) => {
      if (dailyList.findIndex((obj) => obj.id === el.id) < 0) tempData.push(el);
    });

    tempData.sort((a, b) => {
      if (a.item_name < b.item_name) return -1;
      if (a.item_name > b.item_name) return 1;
      return 0;
    });
    console.log(tempData);
    setDailyList(tempData);
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.floating_icon} onClick={onAddDailyMenu}>
        <RiAddCircleLine />
      </div>

      <Modal open={modalOpen}>
        <MenuTodayModal onClose={onCancel} onSave={onSaveHandler} />
      </Modal>
      {dailyList.length === 0 ? (
        <h2 className={styles.no_item}>No item to display</h2>
      ) : (
        <Card data={dailyList} isPrice={true} onSelect={onSelect} />
      )}
    </>
  );
};

export default MenuToday;
