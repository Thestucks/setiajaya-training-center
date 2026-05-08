import { useEffect } from 'react';
import { assetUrl } from '../../utils/assetUrl';

export default function AboutPage() {
  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
    }
  }, []);

  return (
    <section id="about" className="about my-5">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h4>About <b>Setiajaya Mobilindo</b></h4>
        </div>

        <div className="row gy-4">
          <div
            className="col-lg-7 position-relative about-img"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url('${assetUrl('assets/img/sjm-company-profile.jpg')}')`
            }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
          </div>
          <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay="300">
            <div className="content ps-0 ps-lg-5">
              <p>
                Cikal bakal berdirinya PT. Setiajaya Mobilindo berawal dengan didirikannya Depok Motor oleh
                Bapak Yusuf Setiawan pada tahun 1981 berlokasi di Jl. Dewi Sartika No.42 (Belakang) dimana
                lokasi tersebut juga merupakan kediaman pribadi dari beliau.

                Seiring meningkatnya kebutuhan masyarakat akan kendaraan, usaha ini semakin berkembang. Kemudian
                pada tanggal 28 April 1991, Depok Motor dirubah menjadi PT. Setiajaya Mobilindo dengan
                diresmikan oleh Walikota Depok dan PT. Toyota Astra Motor. PT. Setiajaya Mobilindo menjadi
                dealer resmi kendaraan merek Toyota yang bergerak dalam bidang penjualan, servis kendaraan dan
                penjualan suku cadang (VSP).

                Pada awalnya PT. Setiajaya Mobilindo hanya memiliki karyawan berjumlah 25 orang namun seiring
                dengan meningkatnya pertumbuhan perekonomian PT. Setiajaya Mobilindo terus melakukan ekspansi
                secara berkelanjutan. Hingga saat ini PT. Setiajaya Mobilindo sudah memiliki 1 kantor pusat, 5
                Cabang VSP yang terletak di yang terletak di Depok, Bogor, Cibubur, Cimanggis dan Parung serta 1
                bengkel Body &amp; Paint dengan jumlah karyawan keseluruhan lebih dari 600 orang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
