import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';

import IssueForm from './components/IssueForm';
import ListItem from './components/ListItem';
import './scss/app.scss';

const START_LIST = [
  { id: 0, priority: 'Low', description: 'Sample Item 01', assigned: '01' },
  { id: 1, priority: 'Med', description: 'Sample Item 02', assigned: '02' },
];

const App = () => {
  // const [list, setList] = useState(START_LIST);
  const [list, setList] = useLocalStorage('TrackerSavedList', START_LIST);

  const deleteItem = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const List = () => {
    return (
      <div>
        {list.map((item) => (
          <ListItem item={item} key={item.id} deleteItem={deleteItem} />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <IssueForm list={list} setList={setList} />
        <List />
      </div>
    </div>
  );
};
export default App;
