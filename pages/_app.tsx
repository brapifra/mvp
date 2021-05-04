import React from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
});
`,
          }}
        />
      </Head>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body {
          height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
          height: calc(var(--vh, 1vh) * 100);
          width: 100vw;
        }

        #__next {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default App;
