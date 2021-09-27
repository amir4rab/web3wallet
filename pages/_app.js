import WalletsProvider from '../src/providers/walletsProvider/walletsProvider'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
      <WalletsProvider>
        <Component {...pageProps} />
      </WalletsProvider>
    )
}

export default MyApp
