import Image from 'next/image';
import TopBar from '@/page-components/top-bar';
import pageStyles from '@/page-styles/pages.module.css';

export default function Home() {
  return (
    <div className={pageStyles.page_body}>
      <TopBar />
      <main className={pageStyles.page_main}>
        <div className={pageStyles.container}>
          <Image src="/images/logos/logo_256x256.png" alt="bebengs kitchens logo" width={120} height={120} />
          <div className={pageStyles.logo}>Bebeng's Kitchen</div>
          <div className={pageStyles.tagline}>Where every bite is a delight!</div>
        </div>
      </main>
    </div>
  );
}
