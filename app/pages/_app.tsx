import { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useApollo } from 'lib/apollo';
import { AuthProvider } from 'lib/useAuth';
import Header from 'components/Header';
import Head from 'next/head';
import theme from '../lib/theme';

const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0 auto;
    font-family: 'Lato', sans-serif;
  }

  a {
  text-decoration: none;
  }

  button {
    border: none;
    outline: none;
    text-align: center;
  }
`;

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>LIFE MANAGE - Manage your life</title>
        <link rel='icon' type='image/x-icon' href='/public/favicon.ico'></link>
      </Head>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Header />
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
