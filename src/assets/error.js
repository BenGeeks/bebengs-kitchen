import React from 'react';
import pageStyles from '@/styles/page.module.css';

const ErrorPage = ({ error }) => {
  const keys = Object.keys(error);

  return (
    <div className={pageStyles.page_container}>
      {keys.map((key, index) => {
        return (
          <div key={index}>
            <h2>{key}</h2>
            <p>{error[key]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ErrorPage;
