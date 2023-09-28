'use client';
import styles from '@/styles/Production.module.css';
import CustomersListPage from '@/production-components/customers/customers';

const Production = () => {
  return (
    <div className={styles.page_holder}>
      <CustomersListPage />
    </div>
  );
};

export default Production;
