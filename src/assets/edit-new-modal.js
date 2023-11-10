'use client';
import { RiCloseCircleLine } from 'react-icons/ri';

import styles from './edit-new-modal.module.css';
import ModalWide from './modal-wide';
import ReactForm from './react-form';

const EditNewModal = ({ title, open, INPUT, SCHEMA, DEFAULT, onSubmit, onCancel, action }) => {
  return (
    <ModalWide open={open} close={onCancel}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>{title}:</h2>
        <div className={styles.header_icon_container}>
          <div className={styles.header_icon} onClick={onCancel}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <ReactForm layout={INPUT} schema={SCHEMA} defaultValues={DEFAULT} onSubmit={onSubmit} onCancel={onCancel} action={action} />
      </div>
    </ModalWide>
  );
};

export default EditNewModal;
