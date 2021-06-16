import React from 'react';

const ListItem = ({ item, deleteItem, editItem, index }) => {
  return (
    <div className={`${index % 2 === 0 ? 'issue dark' : 'issue'}`} key={index}>
      {item.priority !== 'None' ? (
        <>
          <h3>{item.description}</h3>
          <p>{`Issue ID: ${item.issueId}`}</p>
          <p> {item.priority} priority</p>
          <div>
            <button className="btn" onClick={() => deleteItem(item.issueId)}>
              Delete
            </button>
            <button className="btn edit" onClick={() => editItem(item.issueId)}>
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
