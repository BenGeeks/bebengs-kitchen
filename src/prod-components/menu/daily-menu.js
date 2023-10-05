import React, { useState } from 'react';

import Modal from '@/assets/modal';
import DailyMenuModal from './daily-menu-modal';
import Card from '@/assets/card';

import { RiAddCircleLine } from 'react-icons/ri';
import styles from '@/styles/prod.module.css';

const DailyMenuPage = () => {
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
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>Daily Menu</h2>
        <div className={styles.header_button} onClick={onAddDailyMenu}>
          <RiAddCircleLine />
        </div>
      </div>

      <Modal open={modalOpen}>
        <DailyMenuModal onClose={onCancel} onSave={onSaveHandler} />
      </Modal>

      <Card data={dailyList} isPrice={true} onSelect={onSelect} />
    </div>
  );
};

export default DailyMenuPage;
