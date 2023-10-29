import { RiCloseCircleLine } from 'react-icons/ri';

import ModalWide from '@/assets/modal-wide';
import ReactForm from './react-form';
import assetStyles from '@/styles/assets.module.css';

const EditNewModal = ({ title, open, INPUT, SCHEMA, DEFAULT, onSubmit, onCancel, action }) => {
  return (
    <ModalWide open={open} close={onCancel}>
      <div className={assetStyles.modal_header_bar}>
        <h2 className={assetStyles.modal_header_text}>{title}:</h2>
        <div className={assetStyles.modal_header_icon_container}>
          <div className={assetStyles.modal_header_icon} onClick={onCancel}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div className={assetStyles.modal_body}>
        <ReactForm layout={INPUT} schema={SCHEMA} defaultValues={DEFAULT} onSubmit={onSubmit} onCancel={onCancel} action={action} />
      </div>
    </ModalWide>
  );
};

export default EditNewModal;
