import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';

const priorityOrder = ["Urgent", "High", "Medium", "Low", "No priority"];
const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];

function KanbanBoard({ tasks, users, groupBy, sortBy }) {
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const groupedTasks = tasks.reduce((acc, task) => {
    let key;
    if (groupBy === 'status') key = task.status;
    else if (groupBy === 'user') key = userMap[task.userId]?.name || "Unknown User";
    else key = priorityLabels[task.priority]; 

    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  Object.keys(groupedTasks).forEach(key => {
    groupedTasks[key].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority; 
      return a.title.localeCompare(b.title);
    });
  });

  const sortedGroups = groupBy === 'priority'
    ? priorityOrder.filter(priority => groupedTasks[priority]) 
    : Object.keys(groupedTasks);

  return (
    <div className="kanban-board">
      {sortedGroups.map(group => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {groupedTasks[group].map(task => (
            <KanbanCard key={task.id} task={task} user={userMap[task.userId]} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
