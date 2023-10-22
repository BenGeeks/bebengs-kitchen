import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';

import topBarStyles from '@/page-styles/top-bar.module.css';

const TopBar = () => {
  const router = useRouter();

  return (
    <div className={topBarStyles.main_top_bar}>
      <div className={topBarStyles.logo_container}>
        <Link className={topBarStyles.logo} href="/">
          Bebeng's Kitchen
        </Link>
        <p className={topBarStyles.description}>~ Where every bite is a delight! ~</p>
      </div>
      <div className={topBarStyles.nav_container}>
        <GoogleButton onClick={() => signIn('google').then(() => router.push('/prod'))} />
      </div>
    </div>
  );
};

export default TopBar;
