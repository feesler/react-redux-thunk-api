import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ServiceForm from './components/ServiceForm.jsx';
import ServiceList from './components/ServiceList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/services" />} />
        <Route path="/services/new" Component={ServiceForm} />
        <Route path="/services/:id" Component={ServiceForm} />
        <Route path="/services" Component={ServiceList} />
      </Routes>
    </div>
  );
}

export default App;
