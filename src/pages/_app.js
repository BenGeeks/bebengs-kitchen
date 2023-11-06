import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/prod' })
        .then((registration) => {
          console.log('Service worker registered successfully. Scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bebeng's Kitchen</title>
        <meta name="description" content="Where every bite is a delight!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffefcf" />
        <link rel="apple-touch-icon" href="/image/logo_192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-center"
        transition={Zoom}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={true}
        theme={'colored'}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
