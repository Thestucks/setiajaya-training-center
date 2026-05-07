import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function UsersPage() {
  const { user, users, addUser, updateUser, deleteUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalId, setEditModalId] = useState(null);
  const [addForm, setAddForm] = useState({ name: '', email: '', password: '', role: 'unassigned' });
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});

  if (!user || !['super', 'head', 'admin'].includes(user.role)) return null;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const result = addUser(addForm);
    if (result.success) {
      setShowAddModal(false);
      setAddForm({ name: '', email: '', password: '', role: 'unassigned' });
      setErrors({});
    } else {
      setErrors({ email: result.message });
    }
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    const result = updateUser(id, editForm);
    if (result.success) {
      setEditModalId(null);
      setEditForm({ name: '', email: '', password: '', role: '' });
      setErrors({});
    } else {
      setErrors({ email: result.message });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteUser(id);
    }
  };

  const openEditModal = (u) => {
    setEditForm({ name: '', email: '', password: '', role: u.role });
    setEditModalId(u.id);
    setErrors({});
  };

  return (
    <section id="hero" className="hero d-flex align-items-center section-bg bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card border-0">
              <div className="card-header border-0 text-center d-flex justify-content-between bg-white">
                <h3 className="fw-bold">List users</h3>
                <button type="button" className="btn btn-danger" onClick={() => { setShowAddModal(true); setErrors({}); }}>
                  Add user
                </button>
              </div>

              <div className="card-body d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th className="text-center" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={u.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td className="d-flex flex-row justify-content-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary mx-1"
                            disabled={user.role === u.role || u.role === 'super'}
                            onClick={() => openEditModal(u)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger mx-1"
                            disabled={user.role === u.role || u.role === 'super'}
                            onClick={() => handleDelete(u.id)}
                          >
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add user</h1>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body">
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Name</label>
                    <div className="col">
                      <input type="text" className="form-control" name="name" value={addForm.name} onChange={(e) => setAddForm(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Email Address</label>
                    <div className="col">
                      <input type="email" className={`form-control${errors.email ? ' is-invalid' : ''}`} name="email" value={addForm.email} onChange={(e) => setAddForm(prev => ({ ...prev, email: e.target.value }))} required />
                      {errors.email && <span className="invalid-feedback" role="alert"><strong>{errors.email}</strong></span>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Password</label>
                    <div className="col">
                      <input type="password" className="form-control" name="password" value={addForm.password} onChange={(e) => setAddForm(prev => ({ ...prev, password: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-4 col-form-label text-md-end">Role</label>
                    <div className="col">
                      <select className="form-select" name="role" value={addForm.role} onChange={(e) => setAddForm(prev => ({ ...prev, role: e.target.value }))}>
                        <option value="unassigned">unassigned</option>
                        <option value="student">student</option>
                        <option value="employee">employee</option>
                        <option value="admin">admin</option>
                      </select>
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

      {/* Edit User Modal */}
      {editModalId && (() => {
        const editingUser = users.find(u => u.id === editModalId);
        if (!editingUser) return null;
        return (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Edit user</h1>
                  <button type="button" className="btn-close" onClick={() => setEditModalId(null)}></button>
                </div>
                <form onSubmit={(e) => handleEditSubmit(e, editModalId)}>
                  <div className="modal-body">
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Name</label>
                      <div className="col">
                        <input type="text" className="form-control" name="name" value={editForm.name} onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))} placeholder={editingUser.name} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Email Address</label>
                      <div className="col">
                        <input type="email" className={`form-control${errors.email ? ' is-invalid' : ''}`} name="email" value={editForm.email} onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} placeholder={editingUser.email} />
                        {errors.email && <span className="invalid-feedback" role="alert"><strong>{errors.email}</strong></span>}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Password</label>
                      <div className="col">
                        <input type="password" className="form-control" name="password" value={editForm.password} onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))} placeholder="********" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-4 col-form-label text-md-end">Role</label>
                      <div className="col">
                        <select className="form-select" name="role" value={editForm.role} onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}>
                          <option value={editingUser.role}>Current: {editingUser.role}</option>
                          <option value="unassigned">unassigned</option>
                          <option value="student">student</option>
                          <option value="employee">employee</option>
                          <option value="admin">admin</option>
                          <option value="head">head</option>
                        </select>
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
