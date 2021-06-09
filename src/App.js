import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';

import TopNav from './components/TopNav';
import Login from './components/Login';
import IssueForm from './components/IssueForm';
import ListItem from './components/ListItem';
import './scss/app.scss';

const START_LIST = [
  { id: 0, priority: 'Low', description: 'Sample Item 01' },
  { id: 1, priority: 'Medium', description: 'Edit button now works' },
];
const NULL_ITEM = { id: 0, priority: 'None', description: 'No issues currently' };
const emptyForm = { id: null, description: '', priority: '' };

const App = () => {
  const [list, setList] = useLocalStorage('TrackerSavedList', START_LIST);
  const [issue, setIssue] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const savedList = window.localStorage.getItem('TrackerSavedList');

  useEffect(() => {
    if (!savedList) {
      setList(START_LIST);
    }
  }, [setList, savedList]);

  const deleteItem = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const editItem = (id) => {
    const list = JSON.parse(savedList);
    const item = list.find((item) => item.id === id);
    setIssue(item);
    setIsEditing(true);
    // console.log(`EDIT`, item);
  };

  const List = () => {
    return (
      <div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <ListItem
              item={item}
              index={index}
              key={item.id}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          ))
        ) : (
          <ListItem item={NULL_ITEM} key={NULL_ITEM.id} />
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <TopNav />
      <Route exact path="/">
        <div className="container">
          <IssueForm
            list={list}
            setList={setList}
            issue={issue}
            setIssue={setIssue}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <List />
        </div>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Login />
      </Route>
    </div>
  );
};
export default App;
