import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sjtc_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('sjtc_users');
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Super Admin', email: 'super@setiajaya.co.id', password: 'password', role: 'super' },
      { id: 2, name: 'Head Manager', email: 'head@setiajaya.co.id', password: 'password', role: 'head' },
      { id: 3, name: 'Admin User', email: 'admin@setiajaya.co.id', password: 'password', role: 'admin' },
      { id: 4, name: 'Employee User', email: 'employee@setiajaya.co.id', password: 'password', role: 'employee' },
      { id: 5, name: 'Student User', email: 'student@setiajaya.co.id', password: 'password', role: 'student' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('sjtc_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sjtc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sjtc_user');
    }
  }, [user]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'These credentials do not match our records.' };
  };

  const register = (name, email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) {
      return { success: false, message: 'The email has already been taken.' };
    }
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      password,
      role: 'unassigned'
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserRole = (id, role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    if (user && user.id === id) {
      setUser(prev => ({ ...prev, role }));
    }
  };

  const addUser = (userData) => {
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: 'The email has already been taken.' };
    }
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const updateUser = (id, userData) => {
    const emailConflict = users.find(u => u.email === userData.email && u.id !== id);
    if (userData.email && emailConflict) {
      return { success: false, message: 'The email has already been taken.' };
    }
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const updated = { ...u };
      if (userData.name) updated.name = userData.name;
      if (userData.email) updated.email = userData.email;
      if (userData.password) updated.password = userData.password;
      if (userData.role) updated.role = userData.role;
      return updated;
    }));
    return { success: true };
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{
      user, users, login, register, logout,
      updateUserRole, addUser, updateUser, deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
