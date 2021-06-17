import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from './hooks/useLocalStorage';

import TopNav from './components/TopNav';
import Login from './components/Login';
import IssueForm from './components/IssueForm';
import ListItem from './components/ListItem';
import './scss/app.scss';

const START_LIST = [
  { issueId: 0, priority: 'Low', description: 'Sample Item 01' },
  { issueId: 1, priority: 'Medium', description: 'Edit button now works' },
  { issueId: 2, priority: 'High', description: 'Connected to live MongoDB' },
];
const NULL_ITEM = { issueId: 0, priority: 'None', description: 'No issues currently' };
const emptyForm = { id: null, description: '', priority: '' };

const App = () => {
  const [list, setList] = useLocalStorage('TrackerSavedList', START_LIST);
  const [mongoList, setMongoList] = useState([]);
  const [issue, setIssue] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  // const savedList = window.localStorage.getItem('TrackerSavedList');

  const asyncFetch = async () => {
    try {
      const res = await axios.get(`https://rpd-tracker-mongodb.herokuapp.com/api/issues`);
      if (res) {
        setMongoList(res.data.data);
      } else setMongoList(NULL_ITEM);
    } catch (e) {}
  };

  useEffect(() => {
    asyncFetch();
    // if (!savedList) {
    //   setList(START_LIST);
    // }
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(`https://rpd-tracker-mongodb.herokuapp.com/api/issue/${id}`);
    asyncFetch();
    // if (del) window.location.reload();
    // let newList = list.filter((item) => item.id !== id);
    // setList(newList);
  };

  const editItem = async (id) => {
    // const list = JSON.parse(savedList);
    // const item = list.find((item) => item.id === id);
    const item = await axios.get(`https://rpd-tracker-mongodb.herokuapp.com/api/issue/${id}`);
    setIssue(item.data.data);
    setIsEditing(true);
    // console.log(`EDIT`, item);
  };

  const List = () => {
    return (
      <div>
        {mongoList.length > 0 ? (
          mongoList.map((item, index) => (
            <ListItem
              item={item}
              index={index}
              key={index}
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
            asyncFetch={asyncFetch}
          />
          <List />
        </div>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
};
export default App;
