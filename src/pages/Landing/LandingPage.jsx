import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
    }
  }, []);

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-between gy-5">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
            <h2 data-aos="fade-up">Explore your skills at our<br />Training Centre</h2>
            <p data-aos="fade-up" data-aos-delay="100">Learn anything, with new friends!</p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              {!user ? (
                <Link to="/register" className="btn-book-a-table">
                  Register now!
                </Link>
              ) : (
                <Link to="/certification" className="btn-book-a-table">
                  Great! Enroll now.
                </Link>
              )}
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
            <img src="/assets/img/landing.jpg" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" />
          </div>
        </div>
      </div>
    </section>
  );
}
