import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Layout } from '../app/core/components/Layout/Layout';
import { wrapper } from '../app/core/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
        <title>#OSPdlaUKRAINY</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default wrapper.withRedux(MyApp);
