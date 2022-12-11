import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import createEmotionCache from 'src/config/createEmotionCache';
import { MuiThemeProvider } from 'src/providers/mui-theme-provider';
import 'src/styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <MuiThemeProvider>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </CacheProvider>
  );
}
