import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ServiceForm from './components/ServiceForm.jsx';
import ServiceList from './components/ServiceList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact >
          <Redirect to="/services" />
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
      </Switch>
    </div>
  );
}

export default App;
