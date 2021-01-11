import React, { useState } from "react";

const IssueForm = ({ list, setList }) => {
  const [issue, setIssue] = useState({ description: "", priority: "", assigned: "" });

  const createItem = (e) => {
    e.preventDefault();
    const getId = list.length + 1;
    // if (issue.description === "") {
    //   // TODO make an error message
    //   //do nothing
    // } else if (issue.priority === "") {
    //   // TODO make an error message
    // } else if (issue.assigned === "") {
    //   // TODO make an error message
    // } else {
    console.log("submit");
    setList([...list, { ...issue, id: getId }]);
    clearForm();
    // }
  };

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    console.log("clearForm");
    setIssue({ description: "", priority: "", assigned: "" });
  };

  return (
    <div className="formArea">
      <h1>Add New Issue</h1>
      <form onSubmit={createItem}>
        <label htmlFor="descriptionInput">
          Description
          <input
            type="text"
            name="description"
            className="formInput"
            id="descriptionInput"
            placeholder="Describe the Issue"
            value={issue.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="priorityInput">Priority</label>
        <select
          name="priority"
          className="formInput"
          id="priorityInput"
          value={issue.priority}
          onChange={handleChange}>
          <option value="" default>
            -- Select --
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label htmlFor="assignedInput">Assigned To</label>
        <input
          type="text"
          name="assigned"
          placeholder="Enter Assignment ..."
          className="formInput"
          id="assignedInput"
          value={issue.assigned}
          onChange={handleChange}
        />
        <button className="btn" type="submit" id="btnAdd">
          submit
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
