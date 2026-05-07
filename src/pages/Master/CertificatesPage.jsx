import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function CertificatesPage() {
  const { user } = useAuth();
  const { certificates, trainings } = useData();

  if (!user || !['super', 'head', 'admin', 'employee'].includes(user.role)) return null;

  const getTraining = (trainingId) => {
    return trainings.find(t => t.id === trainingId);
  };

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card border-0">
              <div className="card-header border-0 text-center d-flex justify-content-between bg-white">
                <h3 className="fw-bold">List certificate requests</h3>
                <button className="btn btn-danger" onClick={() => window.print()}>Print all</button>
              </div>

              <div className="card-body d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Requested at</th>
                      <th scope="col">Name</th>
                      <th scope="col">Training</th>
                      <th scope="col">Print</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, index) => {
                      const training = getTraining(cert.training_id);
                      return (
                        <tr key={cert.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{new Date(cert.created_at).toLocaleString()}</td>
                          <td>{cert.name}</td>
                          <td>{training ? `${training.name} Batch ${training.batch} ${training.year}` : 'N/A'}</td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={() => window.print()}>Normal</button>{' '}
                            <button className="btn btn-sm btn-dark" onClick={() => window.print()}>Plain</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
