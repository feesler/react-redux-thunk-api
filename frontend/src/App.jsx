import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ServiceForm from './components/ServiceForm.jsx';
import ServiceList from './components/ServiceList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact >
          <Navigate to="/services" />
        </Route>
        <Route path="/services/new">
          <ServiceForm />
        </Route>
        <Route path="/services/:id">
          <ServiceForm />
        </Route>
        <Route path="/services">
          <ServiceList />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
