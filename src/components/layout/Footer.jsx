export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-geo-alt icon"></i>
            <div>
              <h4>Address</h4>
              <p>
                Jalan Margonda Raya No. 348 <br />
                Pondok Cina, Beji, Kemiri Muka, <br />
                Kecamatan Beji, Kota Depok, Jawa Barat 16424 <br />
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-links d-flex">
            <i className="bi bi-telephone icon"></i>
            <div>
              <h4>Contacts</h4>
              <p>
                <strong>Phone:</strong> (021) 7520034<br />
                <strong>Email:</strong> tc@setiajaya.co.id<br />
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-links d-flex">
            <i className="bi bi-clock icon"></i>
            <div>
              <h4>Opening Hours</h4>
              <p>
                <strong>Everyday: </strong>8AM - 4PM<br />
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Follow Us</h4>
            <div className="social-links d-flex">
              <a href="https://twitter.com/setiajayatoyota" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="https://www.facebook.com/setiajayatoyota/" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/toyotasetiajayaid/" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/company/setiajaya-toyota" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Fauzan Azmi Alfiansyah</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">Yummy and BootstrapMade</a>
        </div>
      </div>
    </footer>
  );
}
