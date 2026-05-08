import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { assetUrl } from '../../utils/assetUrl';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMobileNavToggle = (e) => {
    e.preventDefault();
    setMobileNavActive(prev => !prev);
    document.body.classList.toggle('mobile-nav-active');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center shadow">
      <div className="container d-flex align-items-center justify-content-between">

        <Link to="/" className="logo d-flex align-items-center me-auto me-lg-0">
          <img src={assetUrl('assets/img/sjm-logo.svg')} alt="logo" height="96px" />
        </Link>

        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            {user && (
              <>
                <li><Link to="/certification">Certification</Link></li>
                <li><Link to="/home">Dashboard</Link></li>
                <li className="nav-item dropdown">
                  <a
                    id="navbarDropdown"
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.name}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end border-0 shadow p-3" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>

        {!user && (
          <Link className="btn-book-a-table fw-bold" to="/login">Login</Link>
        )}

        <i
          className={`mobile-nav-toggle ${mobileNavActive ? 'mobile-nav-hide bi bi-x' : 'mobile-nav-show bi bi-list'}`}
          onClick={handleMobileNavToggle}
        ></i>

      </div>
    </header>
  );
}
