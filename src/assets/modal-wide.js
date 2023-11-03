'use client';
import React from 'react';
import { createPortal } from 'react-dom';

import assetStyles from '@/styles/assets.module.css';

const ModalWide = ({ open, close, children }) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className={assetStyles.modal_overlay} onClick={close}></div>
      <div className={assetStyles.modal_wide}>
        <div className={assetStyles.modal_box}>{children}</div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default ModalWide;
