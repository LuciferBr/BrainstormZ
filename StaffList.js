import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staff, setStaff] = useState([]); // Holds the staff list
  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '' }); // Form data for new staff

  // Fetch staff when the component loads
  useEffect(() => {
    axios.get('http://localhost:5000/api/staff')
      .then(res => setStaff(res.data))
      .catch(err => console.log(err));
  }, []); // Empty array means it runs once on load

  // Add a new staff member
  const addStaff = () => {
    axios.post('http://localhost:5000/api/staff', newStaff)
      .then(res => setStaff([...staff, res.data])) // Add new staff to list
      .catch(err => console.log(err));
    setNewStaff({ name: '', role: '', email: '' }); // Clear the form
  };

  return (
    <div>
      <h2>Staff</h2>
      <ul>
        {staff.map(s => (
          <li key={s._id}>{s.name} - {s.role}</li>
        ))}
      </ul>
      <input
        value={newStaff.name}
        onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={newStaff.role}
        onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
        placeholder="Role"
      />
      <input
        value={newStaff.email}
        onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
        placeholder="Email"
      />
      <button onClick={addStaff}>Add Staff</button>
    </div>
  );
};

export default StaffList;