import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import TopBar from '@/page-components/top-bar';
import pageStyles from '@/page-styles/pages.module.css';

const Login = () => {
  const router = useRouter();
  const [pin, setPin] = useState('');

  const handleLogIn = () => {
    setPin('');
    signIn('credentials', { redirect: false, pin: pin }, router.push('/prod'));
  };

  return (
    <div className={pageStyles.page_body}>
      <TopBar />
      <main className={pageStyles.page_main}>
        <div className={pageStyles.container}>
          <div className={pageStyles.login_btn_container}>
            <div className={pageStyles.display}>{pin} </div>
          </div>

          <div className={pageStyles.grid_container}>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 1)}>
              1
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 2)}>
              2
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 3)}>
              3
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 4)}>
              4
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 5)}>
              5
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 6)}>
              6
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 7)}>
              7
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 8)}>
              8
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 9)}>
              9
            </div>
            <div className={pageStyles.grid_item} onClick={() => setPin('')}>
              🗑️
            </div>
            <div className={pageStyles.grid_item} onClick={() => pin.length < 6 && setPin(pin + 0)}>
              0
            </div>
            <div className={pageStyles.grid_item} onClick={() => setPin(pin.slice(0, -1))}>
              🔙
            </div>
          </div>
          <div className={pageStyles.login_btn_container} onClick={handleLogIn}>
            <button className={pageStyles.login_btn}>ENTER</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
