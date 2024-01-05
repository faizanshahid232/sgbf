import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
// eslint-disable-next-line import/no-named-as-default
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import "./index.css"
import ScrollToTop from './Components/scroll-to-top/ScrollToTop';

// ----------------------------------------------------------------------
export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </HashRouter>
    </HelmetProvider>
  );
}
