import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { customAlphabet } from 'nanoid';

const emptyForm = { id: null, description: '', priority: '' };

const IssueForm = ({ list, setList, issue, setIssue, isEditing, setIsEditing, asyncFetch }) => {
  const [error, setError] = useState();

  const nanoid = customAlphabet('0123456789ABCDEF', 6);

  useEffect(() => {
    setIssue(emptyForm);
  }, [setIssue]);

  const createItem = async (e) => {
    e.preventDefault();
    if (!issue.description) {
      setError('description');
    } else if (!issue.priority) {
      setError('priority');
    } else {
      const newId = nanoid();
      await axios.post(`https://rpd-tracker-mongodb.herokuapp.com/api/issue`, {
        ...issue,
        issueId: newId,
      });
      asyncFetch();
      // setList([{ ...issue, issueId: newId }, ...list]);
      clearForm();
      clearError();
    }
  };

  const saveEditItem = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://rpd-tracker-mongodb.herokuapp.com/api/issue/${issue.issueId}`, issue)
      .catch((e) => console.error(e));
    clearForm();
    clearError();
    setIsEditing(false);
    asyncFetch();
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
      <form onSubmit={isEditing ? saveEditItem : createItem}>
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
