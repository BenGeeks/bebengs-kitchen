import { RiCloseCircleLine } from 'react-icons/ri';

import ModalWide from '@/assets/modal-wide';
import ReactForm from './react-form';
import modalStyles from '@/styles/modal.module.css';

const EditNewModal = ({ title, open, INPUT, SCHEMA, DEFAULT, onSubmit, onCancel, action }) => {
  return (
    <ModalWide open={open} close={onCancel}>
      <div className={modalStyles.modal_header_bar}>
        <h2 className={modalStyles.modal_header_text}>{title}:</h2>
        <div className={modalStyles.modal_header_icon_container}>
          <div className={modalStyles.modal_header_icon} onClick={onCancel}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={modalStyles.modal_body}>
        <ReactForm layout={INPUT} schema={SCHEMA} defaultValues={DEFAULT} onSubmit={onSubmit} onCancel={onCancel} action={action} />
      </div>
    </ModalWide>
  );
};

export default EditNewModal;
