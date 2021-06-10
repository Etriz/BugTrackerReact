import React, { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';

const emptyForm = { id: null, description: '', priority: '' };

const IssueForm = ({ list, setList, issue, setIssue, isEditing, setIsEditing }) => {
  const [error, setError] = useState();

  const nanoid = customAlphabet('0123456789ABCDEF', 6);

  useEffect(() => {
    setIssue(emptyForm);
  }, [setIssue]);

  const createItem = (e) => {
    e.preventDefault();
    if (!issue.description) {
      setError('description');
    } else if (!issue.priority) {
      setError('priority');
    } else {
      if (isEditing) {
        const newList = list.filter((item) => item.id !== issue.id);
        // console.log(newList);
        setList([issue, ...newList]);
        clearForm();
        clearError();
        setIsEditing(false);
      } else {
        const newId = nanoid();
        setList([{ ...issue, id: newId }, ...list]);
        clearForm();
        clearError();
      }
    }
  };

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setIssue(emptyForm);
  };
  const clearError = () => {
    setError();
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
        <button className="btn" type="submit" id="btnAdd">
          {isEditing ? 'Done' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
