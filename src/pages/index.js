import { useRouter } from 'next/navigation';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div className={styles.logo_container} onClick={() => router.push('/prod')}>
        <h1 className={styles.logo}>Bebeng's Kitchen</h1>
        <p className={styles.description}>~ Where every bite is a delight! ~</p>
      </div>
      <div className={styles.login_container}>
        <form className={styles.login_form}>
          <div>
            <label className={styles.login_label}>Email Address:</label>
            <input className={styles.login_input} type="email" required></input>
          </div>
          <div>
            <label className={styles.login_label}>Password:</label>
            <input className={styles.login_input} type="password" required></input>
          </div>
          <button className={styles.login_btn}>Login</button>
        </form>
      </div>
    </main>
  );
}
