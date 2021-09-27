import React from 'react';
import Head from 'next/head';
import LoginComponent from '../../src/components/login/login';

function LoginPage() {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="login back to your wallet" />
            </Head>
            <LoginComponent />
        </>
    );
};

export default LoginPage;