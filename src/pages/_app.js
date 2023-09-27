import '@/styles/globals.css';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bebeng's Kitchen</title>
        <meta name="description" content="Where every bite is a delight!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.logo_container}>
        <h1 className={styles.logo}>Bebeng's Kitchen</h1>
        <p className={styles.description}>Where every bite is a delight!</p>
      </div>
      <Component {...pageProps} />
    </>
  );
}
