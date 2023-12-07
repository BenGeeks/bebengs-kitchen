import Image from 'next/image';
import TopBar from '@/page-components/top-bar';
import pageStyles from '@/page-styles/pages.module.css';

export default function Home() {
  return (
    <div className={pageStyles.page_body}>
      <TopBar />
      <main className={pageStyles.page_main}>
        <div className={pageStyles.container}>
          {/* <div className={pageStyles.soon_to_rise}>Soon to Rise!</div> */}
          <Image src="/images/website_logo.png" alt="bebengs kitchens logo" width={120} height={120} />
          <div className={pageStyles.logo}>Bebeng's Kitchen</div>
          <div className={pageStyles.tagline}>Where every bite is a delight!</div>
        </div>
      </main>
    </div>
  );
}
