import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]); // Holds the event list
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' }); // Form data for new event

  // Fetch events when the component loads
  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add a new event
  const addEvent = () => {
    axios.post('http://localhost:5000/api/events', newEvent)
      .then(res => setEvents([...events, res.data])) // Add new event to list
      .catch(err => console.log(err));
    setNewEvent({ title: '', date: '', description: '' }); // Clear the form
  };

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(e => (
          <li key={e._id}>{e.title} - {new Date(e.date).toLocaleDateString()}</li>
        ))}
      </ul>
      <input
        value={newEvent.title}
        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
        placeholder="Title"
      />
      <input
        type="date"
        value={newEvent.date}
        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
      />
      <input
        value={newEvent.description}
        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        placeholder="Description"
      />
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};

export default EventList;