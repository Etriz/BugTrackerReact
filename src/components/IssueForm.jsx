import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const emptyForm = { description: '', priority: '', assigned: '' };

const IssueForm = ({ list, setList }) => {
  const [issue, setIssue] = useState(emptyForm);
  const [error, setError] = useState();

  const createItem = (e) => {
    e.preventDefault();
    const newId = nanoid(6);
    if (!issue.description) {
      setError('description');
    } else if (!issue.priority) {
      setError('priority');
    } else {
      setList([...list, { ...issue, id: newId }]);
      clearForm();
    }
  };

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setIssue(emptyForm);
  };

  return (
    <div className="formArea">
      <h1>Add New Issue</h1>
      <form onSubmit={createItem}>
        <label htmlFor="descriptionInput">
          Description
          <span className="error">
            {error === 'description' ? ' - DESCRIPTION IS REQUIRED' : null}
          </span>
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
        <label htmlFor="priorityInput">
          Priority
          <span className="error">{error === 'priority' ? ' - PRIORITY IS REQUIRED' : null}</span>
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
        </label>
        <label htmlFor="assignedInput">
          Assigned To
          <input
            type="text"
            name="assigned"
            placeholder="Enter assignment"
            className="formInput"
            id="assignedInput"
            value={issue.assigned}
            onChange={handleChange}
          />
        </label>
        <button className="btn" type="submit" id="btnAdd">
          Add
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
