import React from "react";

const ListItem = ({ item }) => {
  return (
    <div className="issue" key={item.id}>
      <h3>{item.description}</h3>
      <p>{item.priority} priority</p>
      <p>Assigned to: {item.assigned}</p>
      <button className="btn">Delete</button>
    </div>
  );
};

export default ListItem;
