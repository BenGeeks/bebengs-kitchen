import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

import ModalWide from '@/assets/modal-wide';
import Table from '@/assets/table';
import { ITEMS_HEADERS } from './resources';

import styles from './collectibles.module.css';

const ViewCollectible = ({ open, close, data }) => {
  return (
    <ModalWide open={open} close={close}>
      <div className={styles.view_collectible_header_bar}>
        <h2 className={styles.view_collectible_header_bar_title}>{data?.name}</h2>
        <h2 className={styles.view_collectible_header_bar_title}>{data?.total?.toLocaleString()}</h2>
        <div className={styles.header_icon} onClick={close}>
          <RiCloseCircleLine />
        </div>
      </div>
      {data?.items?.map((item) => {
        return (
          <div key={item.date} className={styles.view_collectible_body}>
            <div className={styles.view_collectible_item_header}>
              <div className={styles.view_collectible_title}>{item?.date}</div>
              <div className={styles.view_collectible_title}>{(item?.total).toLocaleString()}</div>
            </div>
            <Table headers={ITEMS_HEADERS} data={item.items} />
          </div>
        );
      })}
    </ModalWide>
  );
};

export default ViewCollectible;
