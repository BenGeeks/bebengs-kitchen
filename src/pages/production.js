import styles from '@/styles/Production.module.css';

const Production = () => {
  return (
    <div className={styles.page_holder}>
      <div className={styles.logo_container}>
        <h1 className={styles.logo}>Bebeng's Kitchen</h1>
        <p className={styles.description}>Where every bite is a delight!</p>
      </div>
    </div>
  );
};

export default Production;
