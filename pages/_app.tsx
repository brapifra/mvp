import React from 'react';
import Head from 'next/head';

const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
