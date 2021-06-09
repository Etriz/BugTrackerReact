import React from 'react';

const ListItem = ({ item, deleteItem, editItem, index }) => {
  return (
    <div className={`${index % 2 === 0 ? 'issue dark' : 'issue'}`} key={index}>
      {item.priority !== 'None' ? (
        <>
          <h3>{item.description}</h3>
          <p>{`Issue ID: ${item.id}`}</p>
          <p> {item.priority} priority</p>
          <div>
            <button className="btn" onClick={() => deleteItem(item.id)}>
              Delete
            </button>
            <button className="btn edit" onClick={() => editItem(item.id)}>
              Edit
            </button>
          </div>
        </>
      ) : (
        <h3>{item.description}</h3>
      )}
    </div>
  );
};

export default ListItem;
