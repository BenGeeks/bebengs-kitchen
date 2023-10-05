import React from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const Modal2 = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div className={styles.modal2_overlay}>
      <div className={styles.modal2}>{children}</div>
    </div>,
    document.getElementById('modal2')
  );
};

export default Modal2;
