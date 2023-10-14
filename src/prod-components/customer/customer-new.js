'use client';
import { RiCloseCircleLine } from 'react-icons/ri';

import ReactForm from '@/assets/react-form';
import { INPUT, SCHEMA } from '@/resources/customers';
import modalStyles from '@/styles/modal.module.css';

const CustomerNew = ({ action, onClose, onAdd, onEdit, data }) => {
  return (
    <>
      <div className={modalStyles.modal_header_bar}>
        <h2 className={modalStyles.modal_header_text}>{`${action} customer:`}</h2>
        <div className={modalStyles.modal_header_icon_container}>
          <div className={modalStyles.modal_header_icon} onClick={onClose}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={modalStyles.modal_body}>
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
