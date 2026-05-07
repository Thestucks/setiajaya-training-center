import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [trainings, setTrainings] = useState(() => {
    const stored = localStorage.getItem('sjtc_trainings');
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Basic Technician', batch: '1', year: '2023', start: '2023-01-15', end: '2023-03-15' },
      { id: 2, name: 'Advanced Body & Paint', batch: '2', year: '2023', start: '2023-04-01', end: '2023-06-30' },
      { id: 3, name: 'Service Advisor', batch: '1', year: '2024', start: '2024-01-10', end: '2024-03-10' },
    ];
  });

  const [certificates, setCertificates] = useState(() => {
    const stored = localStorage.getItem('sjtc_certificates');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('sjtc_trainings', JSON.stringify(trainings));
  }, [trainings]);

  useEffect(() => {
    localStorage.setItem('sjtc_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Training CRUD
  const addTraining = (data) => {
    const newTraining = {
      id: trainings.length > 0 ? Math.max(...trainings.map(t => t.id)) + 1 : 1,
      ...data
    };
    setTrainings(prev => [...prev, newTraining]);
    return { success: true };
  };

  const updateTraining = (id, data) => {
    setTrainings(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t };
      if (data.name) updated.name = data.name;
      if (data.batch) updated.batch = data.batch;
      if (data.year) updated.year = data.year;
      if (data.start) updated.start = data.start;
      if (data.end) updated.end = data.end;
      return updated;
    }));
    return { success: true };
  };

  const deleteTraining = (id) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  };

  // Certificate CRUD
  const addCertificate = (data) => {
    const newCert = {
      id: certificates.length > 0 ? Math.max(...certificates.map(c => c.id)) + 1 : 1,
      ...data,
      created_at: new Date().toISOString()
    };
    setCertificates(prev => [...prev, newCert]);
    return { success: true };
  };

  const getTrainingById = (id) => {
    return trainings.find(t => t.id === parseInt(id));
  };

  return (
    <DataContext.Provider value={{
      trainings, certificates,
      addTraining, updateTraining, deleteTraining,
      addCertificate, getTrainingById
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
