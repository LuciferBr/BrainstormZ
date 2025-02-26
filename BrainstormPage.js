import React from 'react';
import Dashboard from '../components/Dashboard';
import StaffList from '../components/StaffList';
import EventList from '../components/EventList';

const BrainstormPage = () => {
  return (
    <div className="App-section-holo">
      <h2>Brainstorm Core</h2>
      <p>Central node of the 2070s neural network. Initiate your quantum workflows here.</p>
      <Dashboard />
      <StaffList />
      <EventList />
    </div>
  );
};

export default BrainstormPage;