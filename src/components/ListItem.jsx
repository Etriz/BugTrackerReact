import React from 'react';

const ListItem = ({ item, deleteItem }) => {
  return (
    <div className="issue" key={item.id}>
      <h3>{item.description}</h3>
      <p>{item.priority} priority</p>
      <p>Assigned to: {item.assigned}</p>
      <button className="btn" onClick={() => deleteItem(item.id)}>
        Delete
      </button>
    </div>
  );
};

export default ListItem;
