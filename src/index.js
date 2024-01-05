/* eslint-disable import/order */
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socketIO from 'socket.io-client';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <GoogleOAuthProvider clientId="371083327056-54a7g026h0p7s7c633u3g3b3hgogati5.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
