import React from 'react';
import pageStyles from '@/styles/page.module.css';

const LoadingPage = () => {
  return (
    <div className={pageStyles.page_container}>
      <img className={pageStyles.loading_gif} src="/images/loading-gif.gif" alt="loading gif" />
    </div>
  );
};

export default LoadingPage;
