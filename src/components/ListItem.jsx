import React from 'react';

const ListItem = ({ item, deleteItem }) => {
  return (
    <div className="issue" key={item.id}>
      <h3>{item.description}</h3>
      <p>{item.priority} priority</p>
      <p>{item.assigned ? `Assigned to: ${item.assigned}` : null}</p>
      <div style={{ borderRadius: '1rem' }}>
        <button className="btn" onClick={() => deleteItem(item.id)}>
          Delete
        </button>
        <button className="btn edit" onClick={null}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ListItem;
