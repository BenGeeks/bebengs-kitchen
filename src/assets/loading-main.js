'use client';
import { createPortal } from 'react-dom';

import styles from './modal-wide.module.css';

const LoadingMain = ({ open, close }) => {
  if (!open) return null;

  return createPortal(
    <div className={styles.modal_overlay} onClick={close}>
      <img src="/images/resources/loader.gif" alt="loader gif" />
    </div>,
    document.getElementById('loader_div')
  );
};

export default LoadingMain;
