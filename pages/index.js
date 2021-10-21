import Head from 'next/head';

import HomeComponent from '../src/components/home/home';

import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 wallet</title>
        <meta name="description" content="web3 hot wallet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <HomeComponent />
    </div>
  )
}
