import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function EnrollPage() {
  const { user } = useAuth();
  const { trainings, addCertificate } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    birthdate: '',
    address: '',
    branch: '',
    phone: '',
    education: 'Highschool or equivalent',
    type: 'Toyota',
    training_id: trainings.length > 0 ? trainings[0].id : ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'The full name field is required.';
    if (!formData.nik) newErrors.nik = 'The NIK field is required.';
    if (!formData.birthdate) newErrors.birthdate = 'The birthdate field is required.';
    if (!formData.address) newErrors.address = 'The address field is required.';
    if (!formData.branch) newErrors.branch = 'The branch field is required.';
    if (!formData.phone) newErrors.phone = 'The phone field is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addCertificate({
      ...formData,
      training_id: parseInt(formData.training_id)
    });

    if (user && user.role === 'student') {
      navigate('/');
    } else {
      navigate('/master/certificates');
    }
  };

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0">
              <div className="card-header border-0 text-center bg-white">
                <h3 className="fw-bold">Request Certificate</h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="row mb-3">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Full name</label>
                    <div className="col-md-6">
                      <input
                        id="name" type="text"
                        className={`form-control${errors.name ? ' is-invalid' : ''}`}
                        name="name" value={formData.name} onChange={handleChange}
                        required autoComplete="name" autoFocus
                        placeholder={user ? `Example: ${user.name}` : 'Example: John Doe'}
                      />
                      {errors.name && <span className="invalid-feedback" role="alert"><strong>{errors.name}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="nik" className="col-md-4 col-form-label text-md-end">Indonesian ID (NIK)</label>
                    <div className="col-md-6">
                      <input
                        id="nik" type="number"
                        className={`form-control${errors.nik ? ' is-invalid' : ''}`}
                        name="nik" value={formData.nik} onChange={handleChange}
                        required placeholder="Example: 3271...."
                      />
                      {errors.nik && <span className="invalid-feedback" role="alert"><strong>{errors.nik}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="birthdate" className="col-md-4 col-form-label text-md-end">Birthdate</label>
                    <div className="col-md-6">
                      <input
                        id="birthdate" type="text"
                        className={`form-control${errors.birthdate ? ' is-invalid' : ''}`}
                        name="birthdate" value={formData.birthdate} onChange={handleChange}
                        required placeholder="Example: Depok, 31 February 2000"
                      />
                      {errors.birthdate && <span className="invalid-feedback" role="alert"><strong>{errors.birthdate}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="address" className="col-md-4 col-form-label text-md-end">Address</label>
                    <div className="col-md-6">
                      <input
                        id="address" type="text"
                        className={`form-control${errors.address ? ' is-invalid' : ''}`}
                        name="address" value={formData.address} onChange={handleChange}
                        required placeholder="Example: Jl. Depok No. 1"
                      />
                      {errors.address && <span className="invalid-feedback" role="alert"><strong>{errors.address}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="branch" className="col-md-4 col-form-label text-md-end">Branch</label>
                    <div className="col-md-6">
                      <input
                        id="branch" type="text"
                        className={`form-control${errors.branch ? ' is-invalid' : ''}`}
                        name="branch" value={formData.branch} onChange={handleChange}
                        required placeholder="Example: Cibubur"
                      />
                      {errors.branch && <span className="invalid-feedback" role="alert"><strong>{errors.branch}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">Phone</label>
                    <div className="col-md-6">
                      <input
                        id="phone" type="number"
                        className={`form-control${errors.phone ? ' is-invalid' : ''}`}
                        name="phone" value={formData.phone} onChange={handleChange}
                        required placeholder="Example: 08123456789"
                      />
                      {errors.phone && <span className="invalid-feedback" role="alert"><strong>{errors.phone}</strong></span>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="education" className="col-md-4 col-form-label text-md-end">Education</label>
                    <div className="col-md-6">
                      <select className="form-select" name="education" value={formData.education} onChange={handleChange} aria-label="Select education">
                        <option value="Highschool or equivalent">Highschool or equivalent</option>
                        <option value="Bachelor degree">Bachelor degree</option>
                        <option value="Magister degree">Magister degree</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="type" className="col-md-4 col-form-label text-md-end">Type</label>
                    <div className="col-md-6">
                      <select className="form-select" name="type" value={formData.type} onChange={handleChange} aria-label="Select type">
                        <option value="Toyota">Toyota</option>
                        <option value="Non Toyota">Non Toyota</option>
                        <option value="Fresh Graduate">Fresh Graduate</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="training_id" className="col-md-4 col-form-label text-md-end">Training</label>
                    <div className="col-md-6">
                      <select className="form-select" name="training_id" value={formData.training_id} onChange={handleChange} aria-label="Select training">
                        {trainings.map(training => (
                          <option key={training.id} value={training.id}>
                            {training.name + ' Batch ' + training.batch + ' ' + training.year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-danger">
                        Request
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
