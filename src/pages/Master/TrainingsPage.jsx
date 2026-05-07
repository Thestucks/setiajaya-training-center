import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TrainingsPage() {
  const { user } = useAuth();
  const { trainings, addTraining, updateTraining, deleteTraining } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalId, setEditModalId] = useState(null);
  const [addForm, setAddForm] = useState({ name: '', batch: '', year: '', start: '', end: '' });
  const [editForm, setEditForm] = useState({ name: '', batch: '', year: '', start: '', end: '' });

  if (!user || !['super', 'head', 'admin', 'employee'].includes(user.role)) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addTraining(addForm);
    setShowAddModal(false);
    setAddForm({ name: '', batch: '', year: '', start: '', end: '' });
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    updateTraining(id, editForm);
    setEditModalId(null);
    setEditForm({ name: '', batch: '', year: '', start: '', end: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteTraining(id);
    }
  };

  const openEditModal = (t) => {
    setEditForm({ name: '', batch: '', year: '', start: t.start, end: t.end });
    setEditModalId(t.id);
  };

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card border-0">
              <div className="card-header border-0 text-center d-flex justify-content-between bg-white">
                <h3 className="fw-bold">List trainings</h3>
                <button type="button" className="btn btn-danger" onClick={() => setShowAddModal(true)}>
                  Add training
                </button>
              </div>

              <div className="card-body d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Year</th>
                      <th scope="col">Start</th>
                      <th scope="col">End</th>
                      <th className="text-center" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainings.map((t, index) => (
                      <tr key={t.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{t.name}</td>
                        <td>{t.batch}</td>
                        <td>{t.year}</td>
                        <td>{t.start}</td>
                        <td>{t.end}</td>
                        <td className="d-flex flex-row justify-content-center">
                          <button type="button" className="btn btn-sm btn-secondary mx-1" onClick={() => openEditModal(t)}>
                            Edit
                          </button>
                          <button type="button" className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(t.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Training Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add training</h1>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body">
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Name</label>
                    <div className="col">
                      <input type="text" className="form-control" value={addForm.name} onChange={(e) => setAddForm(p => ({ ...p, name: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Batch</label>
                    <div className="col">
                      <input type="text" className="form-control" value={addForm.batch} onChange={(e) => setAddForm(p => ({ ...p, batch: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Year</label>
                    <div className="col">
                      <input type="number" className="form-control" value={addForm.year} onChange={(e) => setAddForm(p => ({ ...p, year: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Start</label>
                    <div className="col">
                      <input type="date" className="form-control" value={addForm.start} onChange={(e) => setAddForm(p => ({ ...p, start: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">End</label>
                    <div className="col">
                      <input type="date" className="form-control" value={addForm.end} onChange={(e) => setAddForm(p => ({ ...p, end: e.target.value }))} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                  <button type="submit" className="btn btn-danger">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Training Modal */}
      {editModalId && (() => {
        const editingTraining = trainings.find(t => t.id === editModalId);
        if (!editingTraining) return null;
        return (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Edit training</h1>
                  <button type="button" className="btn-close" onClick={() => setEditModalId(null)}></button>
                </div>
                <form onSubmit={(e) => handleEditSubmit(e, editModalId)}>
                  <div className="modal-body">
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Name</label>
                      <div className="col">
                        <input type="text" className="form-control" value={editForm.name} onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))} placeholder={editingTraining.name} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Batch</label>
                      <div className="col">
                        <input type="text" className="form-control" value={editForm.batch} onChange={(e) => setEditForm(p => ({ ...p, batch: e.target.value }))} placeholder={editingTraining.batch} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Year</label>
                      <div className="col">
                        <input type="text" className="form-control" value={editForm.year} onChange={(e) => setEditForm(p => ({ ...p, year: e.target.value }))} placeholder={editingTraining.year} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Start</label>
                      <div className="col">
                        <input type="date" className="form-control" value={editForm.start} onChange={(e) => setEditForm(p => ({ ...p, start: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">End</label>
                      <div className="col">
                        <input type="date" className="form-control" value={editForm.end} onChange={(e) => setEditForm(p => ({ ...p, end: e.target.value }))} required />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setEditModalId(null)}>Close</button>
                    <button type="submit" className="btn btn-danger">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
