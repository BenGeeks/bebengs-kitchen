'use client';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <img className={styles.loading_gif} src="/images/resources/loading-gif.gif" alt="loading gif" />
    </div>
  );
};

export const Error = (error) => {
  console.log(error);

  return (
    <div className={styles.error_container}>
      <div className={styles.error_icon}>
        <BiErrorAlt />
      </div>
      <div className={styles.error_message}>An error occurred while trying to fetch the data.</div>
    </div>
  );
};
