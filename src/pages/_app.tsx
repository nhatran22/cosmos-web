import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
