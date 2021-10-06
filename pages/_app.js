import WalletsProvider from '../src/providers/walletsProvider/walletsProvider';
import PendingTransactionsProvider from '../src/providers/pendingTransactionsProvider/pendingTransactionsProvider';
import SettingsProvider from '../src/providers/settingsProvider/settingsprovider';

import '../styles/globals.scss';
import InitialLoading from '../src/components/loading/initialLoading/initialLoading';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
      <WalletsProvider>
        <SettingsProvider>
          <PendingTransactionsProvider>
            <InitialLoading>
              <Component {...pageProps} />
            </InitialLoading>
          </PendingTransactionsProvider>
        </SettingsProvider>
      </WalletsProvider>
    )
}

export default MyApp
