import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollTop from '../ScrollTop';
import Preloader from '../Preloader';

export default function YummyLayout() {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
      <Preloader />
    </>
  );
}
