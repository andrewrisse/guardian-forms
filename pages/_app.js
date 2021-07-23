import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import cookie from 'cookie';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme/theme';
import GlobalStyles from '../src/components/GlobalStyles';
// Redux
import {store} from "../src/redux/store";

export default function MyApp(props) {
  const { Component, pageProps, cookies } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        x
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </React.Fragment>
  );
}


function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || '');
}

MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  };
};
