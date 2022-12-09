import { useState } from 'react';
import './App.scss';
import TodoBody from './TodoBody/TodoBody';
import TodoHello from './TodoBody/TodoHello/TodoHello';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoModal from './TodoModal/TodoModal';

function App() {
  const [list, setList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [removeId, setRemoveId] = useState();

  return (
    <div className="app">
      <TodoHeader setList={setList} />
      <TodoBody list={list} setList={setList} setDeleted={setDeleted} setRemoveId={setRemoveId} />
      {deleted && <TodoModal setList={setList} setDeleted={setDeleted} removeId={removeId} />}
      {localStorage.getItem('userList') ? (
        JSON.parse(localStorage.getItem('userList')).length ? null : (
          <TodoHello />
        )
      ) : (
        <TodoHello />
      )}
    </div>
  );
}

export default App;
