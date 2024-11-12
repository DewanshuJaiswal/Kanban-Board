import React from 'react';
import './KanbanCard.css';

const priorityColors = {
  4: "#FF5F56", // Urgent (red)
  3: "#FFBD2E", // High (orange)
  2: "#27AE60", // Medium (green)
  1: "#3498DB", // Low (blue)
  0: "#BDC3C7"  // No priority (gray)
};

function KanbanCard({ task, user }) {
  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="card-id">{task.id}</span>
        {user?.avatar && <img src={user.avatar} alt={user.name} className="user-avatar" />}
      </div>
      <h3 className="card-title">{task.title}</h3>
      <div className="card-footer">
        <span
          className="priority-dot"
          style={{ backgroundColor: priorityColors[task.priority] }}
        ></span> {}
        {task.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default KanbanCard;
