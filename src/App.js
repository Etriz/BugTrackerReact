import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

const START_LIST = [
  { id: 0, priority: "Low", desc: "Test bug 01" },
  { id: 1, priority: "Med", desc: "Test bug 02" },
];

const App = () => {
  const [bugs, setBugs] = useState(START_LIST);

  const AddForm = () => {
    return (
      <div className="add-item">
        <form onSubmit={createItem}>
          <label>Priority</label>
          <br />
          <select type="dropdown" name="priority" id="priority">
            <option value="">--Choose One--</option>
            <option value="Low">Low</option>
            <option value="Med">Med</option>
            <option value="High">High</option>
          </select>
          <br />
          <label>Description</label>
          <br />
          <input type="text" name="desc" id="desc"></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  const createItem = event => {
    event.preventDefault();
    const getId = bugs.length + 1;
    const getPriority = document.getElementById("priority").value;
    const getDescription = document.getElementById("desc").value;
    if (getPriority === "" || getDescription === "") {
      //do nothing
    } else {
      const tempBug = { id: getId, priority: getPriority, desc: getDescription };
      const newBugs = [...bugs, tempBug];
      setBugs(newBugs);
    }
  };

  const BugList = () => {
    return (
      <div>
        {bugs.map(item => (
          <div className="bug-item" key={item.id}>
            <h3>{item.desc}</h3>
            <p>{item.priority} priority</p>
            <button onClick="">Delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <AddForm />
      <BugList />
    </div>
  );
};
export default App;
