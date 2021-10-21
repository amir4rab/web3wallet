import React from 'react'
import Head from 'next/head';

function _offline() {
    return (
        <>
            <Head>
                <title>you are offline</title>
            </Head>
            <div>
                <h1>
                    you are offline :(
                </h1>
                <p>
                    Sorry, this app requires an internet connection, to function properly!
                </p>
            </div>
        </>
    )
}

export default _offline
