import Image from 'next/image';
import Link from 'next/link';
import topBarStyles from '@/page-styles/top-bar.module.css';

const TopBar = () => {
  return (
    <div className={topBarStyles.main_top_bar}>
      <div className={topBarStyles.logo_container}>
        <Image className={topBarStyles.logo_image} src="/images/logos/logo_256x256.png" alt="bebengs kitchens logo" width={50} height={50} />
        <Link className={topBarStyles.logo} href="/">
          Bebeng's Kitchen
        </Link>
        <p className={topBarStyles.description}>~ Where every bite is a delight! ~</p>
      </div>
      <div className={topBarStyles.nav_container}>
        <Link className={topBarStyles.main_nav} href="/">
          HOME
        </Link>

        <Link className={topBarStyles.main_nav} href="/auth/login">
          APP
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
