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
                    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#000000' />
                    <link rel='shortcut icon' href='/favicon.svg' />

                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content={`https://${ process.env.NEXT_PUBLIC_DOMAIN }`} />
                    <meta name='twitter:title' content='Web3 wallet' />
                    <meta name='twitter:description' content='Simple and Secure web3 wallet' />
                    <meta name='twitter:image' content={`https://${ process.env.NEXT_PUBLIC_DOMAIN }/icons/android-chrome-192x192.png`} />
                    <meta name='twitter:creator' content='@amir4rab' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Web3 wallet' />
                    <meta property='og:description' content='Simple and Secure web3 wallet' />
                    <meta property='og:site_name' content='Web3 wallet' />
                    <meta property='og:url' content={`https://${ process.env.NEXT_PUBLIC_DOMAIN }`} />
                    <meta property='og:image' content={`https://${ process.env.NEXT_PUBLIC_DOMAIN }/icons/apple-touch-icon.png`} /> 

                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-640x1136.png" 
                        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-750x1294.png" 
                        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-1242x2148.png" 
                        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-1125x2436.png" 
                        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-1536x2048.png" 
                        media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-1668x2224.png" 
                        media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" 
                    />
                    <link 
                        rel="apple-touch-startup-image" 
                        href="images/launch-2048x2732.png" 
                        media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
                    />
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
