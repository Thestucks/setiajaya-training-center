import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'The email field is required.';
    if (!password) newErrors.password = 'The password field is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/home');
    } else {
      setErrors({ email: result.message });
    }
  };

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 p-5">
              <div className="card-header border-0 bg-white text-center">
                <h3 className="fw-bold">Login</h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="row mb-3">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>
                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className={`form-control${errors.email ? ' is-invalid' : ''}`}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.email && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{errors.email}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>
                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className={`form-control${errors.password ? ' is-invalid' : ''}`}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      {errors.password && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{errors.password}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 offset-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          id="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-danger">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
