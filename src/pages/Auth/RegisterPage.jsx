import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = 'The name field is required.';
    if (!email) newErrors.email = 'The email field is required.';
    if (!password) newErrors.password = 'The password field is required.';
    if (password.length < 8) newErrors.password = 'The password must be at least 8 characters.';
    if (password !== passwordConfirmation) newErrors.password = 'The password confirmation does not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = register(name, email, password);
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
            <div className="card border-0">
              <div className="card-header border-0 bg-white text-center">
                <h3 className="fw-bold">Register</h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="row mb-3">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>
                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className={`form-control${errors.name ? ' is-invalid' : ''}`}
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                        autoFocus
                      />
                      {errors.name && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{errors.name}</strong>
                        </span>
                      )}
                    </div>
                  </div>

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
                        autoComplete="new-password"
                      />
                      {errors.password && (
                        <span className="invalid-feedback" role="alert">
                          <strong>{errors.password}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Confirm Password</label>
                    <div className="col-md-6">
                      <input
                        id="password-confirm"
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div className="row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-danger">
                        Register
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
