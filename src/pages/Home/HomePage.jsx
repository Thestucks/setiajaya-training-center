import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {
  const { user, updateUserRole } = useAuth();

  const handleGetStudentRole = (e) => {
    e.preventDefault();
    updateUserRole(user.id, 'student');
  };

  if (!user) return null;

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {user.role === 'unassigned' && (
              <div className="card border-0 text-center">
                <div className="card-header border-0">
                  <h3 className="fw-bold">Are you a student?</h3>
                </div>
                <div className="card-body d-flex justify-content-center">
                  <form onSubmit={handleGetStudentRole}>
                    <button type="submit" className="btn btn-danger mx-2">Yes</button>
                  </form>
                  <a className="btn btn-secondary mx-2" href="">No</a>
                </div>
              </div>
            )}
            {user.role !== 'unassigned' && (
              <div className="card border-0 text-center">
                <div className="card-header border-0">
                  <h3 className="fw-bold">{'Hello, ' + user.name}</h3>
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                  <p>Welcome to <span className="text-danger fw-bold">Setiajaya Toyota Training Centre!</span></p>
                  <div className="d-flex flex-row justify-content-evenly">
                    {(user.role === 'super' || user.role === 'head' || user.role === 'admin') && (
                      <Link to="/master/users" className="btn btn-danger">Manage users</Link>
                    )}
                    {user.role !== 'unassigned' && user.role !== 'student' && (
                      <>
                        <Link to="/master/trainings" className="btn btn-danger">Manage trainings</Link>
                        <Link to="/master/certificates" className="btn btn-danger">Manage certificates</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
