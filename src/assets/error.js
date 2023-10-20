import React from 'react';
import pageStyles from '@/styles/page.module.css';

const ErrorPage = ({ error }) => {
  console.log('ERROR: ', error);

  return (
    <div className={pageStyles.page_container}>
      <h2>An error occurred</h2>
    </div>
  );
};

export default ErrorPage;
