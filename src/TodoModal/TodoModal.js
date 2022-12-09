import React from 'react';
import './TodoModal.scss';

export default function TodoModal({ setDeleted, removeId, setList }) {
  return (
    <div className={'modalActive modalDiv'} onClick={() => setDeleted(false)}>
      <div id="deletedDiv" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete?</p>
        <div>
          <button
            onClick={() => {
              localStorage.setItem(
                'userList',
                JSON.stringify(
                  JSON.parse(localStorage.getItem('userList')).filter((el) => {
                    return removeId !== el.id;
                  }),
                ),
              );
              setList(JSON.parse(localStorage.getItem('userList')));
              setDeleted(false);
            }}>
            Yes
          </button>
          <button onClick={() => setDeleted(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
