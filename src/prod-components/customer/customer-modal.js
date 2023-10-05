'use client';
import { RiCloseCircleLine } from 'react-icons/ri';
import styles from '@/assets/modal.module.css';

import ReactForm from '@/assets/react-form';
import { FORM_INPUT, LOGIN_SCHEMA } from './resources';

const CustomerModal = ({ action, onClose, data }) => {
  const onSubmitHandler = (formData) => {
    console.log(formData);
    onClose();
  };

  return (
    <div>
      <div className={styles.modal_header_bar}>
        <h2 className={styles.modal_header_text}>{`${action} customer:`}</h2>
        <div className={styles.modal_header_icon} onClick={onClose}>
          <RiCloseCircleLine />
        </div>
      </div>
      <div className={styles.modal_body}>
        <ReactForm
          layout={FORM_INPUT}
          schema={LOGIN_SCHEMA}
          defaultValues={data}
          onSubmit={onSubmitHandler}
          action={action}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default CustomerModal;
