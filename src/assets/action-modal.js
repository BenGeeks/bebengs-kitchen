import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';

import ModalWide from '@/assets/modal-wide';
import styles from './action-modal.module.css';

const ActionModal = ({ name, open, close, onCancel, onEdit, onDelete }) => {
  return (
    <ModalWide open={open} close={close}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select an action for {name}</h2>
      </div>
      <div className={styles.cards_container}>
        <div className={styles.card_edit} onClick={onEdit}>
          <div className={styles.card_icon}>
            <RiEditLine />
          </div>
          <div className={styles.card_name}>EDIT</div>
        </div>
        <div className={styles.card_delete} onClick={onDelete}>
          <div className={styles.card_icon}>
            <RiDeleteBin4Line />
          </div>
          <div className={styles.card_name}>DELETE</div>
        </div>
        <div className={styles.card_cancel} onClick={onCancel}>
          <div className={styles.card_icon}>
            <ImCancelCircle />
          </div>
          <div className={styles.card_name}>CANCEL</div>
        </div>
      </div>
    </ModalWide>
  );
};

export default ActionModal;
