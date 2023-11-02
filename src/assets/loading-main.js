import { createPortal } from 'react-dom';

import assetStyles from '@/styles/assets.module.css';

const LoadingMain = ({ open, close }) => {
  if (!open) return null;

  return createPortal(
    <div className={assetStyles.modal_overlay} onClick={close}>
      <img src="/images/loader.gif" alt="loader gif" />
    </div>,
    document.getElementById('loader_div')
  );
};

export default LoadingMain;
