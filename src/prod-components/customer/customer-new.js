'use client';
import { RiCloseCircleLine } from 'react-icons/ri';
import styles from '@/assets/modal.module.css';

import ReactForm from '@/assets/react-form';
import { INPUT, SCHEMA } from './resources';

const CustomerNew = ({ action, onClose, onAdd, onEdit, data }) => {
  return (
    <>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>{`${action} customer:`}</h2>
        <div className={styles.modal_header_icon} onClick={onClose}>
          <RiCloseCircleLine />
        </div>
      </div>
      <div className={styles.modal_body}>
        <ReactForm
          layout={INPUT}
          schema={SCHEMA}
          defaultValues={data}
          onSubmit={action === 'Add' ? onAdd : onEdit}
          action={action}
          onCancel={onClose}
        />
      </div>
    </>
  );
};

export default CustomerNew;
