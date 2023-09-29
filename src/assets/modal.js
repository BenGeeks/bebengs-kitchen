import React from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const Modal = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
