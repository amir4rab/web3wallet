import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name='application-name' content='Web3 Wallet' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Web3 Wallet' />
                    <meta name='description' content='Simple and Secure web3 wallet' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    {/* <meta name='msapplication-config' content='/icons/browserconfig.xml' /> */}
                    <meta name='msapplication-TileColor' content='#000000' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#000000' />

                    <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
                    <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

                    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                    <link rel='manifest' href='/manifest.json' />
                    {/* <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#000000' /> */}
                    <link rel='shortcut icon' href='/favicon.svg' />

                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content={`https://${process.env.DOMAIN}`} />
                    <meta name='twitter:title' content='Web3 wallet' />
                    <meta name='twitter:description' content='Simple and Secure web3 wallet' />
                    <meta name='twitter:image' content={`https://${process.env.DOMAIN}/icons/android-chrome-192x192.png`} />
                    <meta name='twitter:creator' content='@amir4rab' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Web3 wallet' />
                    <meta property='og:description' content='Simple and Secure web3 wallet' />
                    <meta property='og:site_name' content='Web3 wallet' />
                    <meta property='og:url' content={`https://${process.env.DOMAIN}`} />
                    <meta property='og:image' content={`https://${process.env.DOMAIN}/icons/apple-touch-icon.png`} />


                    {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
                    <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
