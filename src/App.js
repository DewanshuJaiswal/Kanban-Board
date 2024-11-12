import React, { useEffect, useState, useRef } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <div className="top-bar">
        <div className="display-control" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`display-button ${showDropdown ? 'open' : ''}`}
          >
            Display <span className="arrow">&#9662;</span> {/* Arrow icon */}
          </button>
          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-section">
                <label>Grouping:</label>
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-section">
                <label>Ordering:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <KanbanBoard tasks={tasks} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
