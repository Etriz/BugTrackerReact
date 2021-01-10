import React, { useState } from "react";
import IssueForm from "./components/IssueForm";
import ListItem from "./components/ListItem";
import "./scss/app.scss";

const START_LIST = [
  { id: 0, priority: "Low", description: "Test item 01", assigned: "01" },
  { id: 1, priority: "Med", description: "Test item 02", assigned: "02" },
];

const App = () => {
  const [list, setList] = useState(START_LIST);

  const List = () => {
    return (
      <div>
        {list.map((item) => (
          <ListItem item={item} key={item.id} />
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
