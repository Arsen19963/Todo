import React, { useState } from 'react';
import './TodoHeader.scss';
import { v4 as uuidv4 } from 'uuid';

export default function TodoHeader({ setList }) {
  const [text, setText] = useState('');
  const [lengthWorning, setLengthWorning] = useState(false);

  return (
    <div className="todoHeader">
      {localStorage.getItem('userList') ? (
        JSON.parse(localStorage.getItem('userList')).length ? (
          <div className="hideCompleted" id="hideCompleted">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={localStorage.getItem('cheked') ? true : false}
                onChange={() => {
                  localStorage.setItem(
                    'userList',
                    JSON.stringify(
                      JSON.parse(localStorage.getItem('userList')).map((el) => {
                        if (el.isComplited) {
                          return {
                            ...el,
                            hiddened: !el.hiddened,
                          };
                        }
                        return el;
                      }),
                    ),
                  );
                  localStorage.getItem('cheked')
                    ? localStorage.removeItem('cheked')
                    : localStorage.setItem('cheked', 'yes');
                  setList(JSON.parse(localStorage.getItem('userList')));
                }}
              />
              <p id="hideComplitedTag">Hide Complited</p>
            </label>
          </div>
        ) : null
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!localStorage.getItem('userList')) {
            text.trim().length &&
              localStorage.setItem(
                'userList',
                JSON.stringify([
                  {
                    text: text,
                    id: uuidv4(),
                    isComplited: false,
                    hiddened: false,
                  },
                ]),
              );
          } else {
            text.trim().length &&
              localStorage.setItem(
                'userList',
                JSON.stringify([
                  {
                    text: text,
                    id: uuidv4(),
                    isComplited: false,
                    hiddened: false,
                  },
                  ...JSON.parse(localStorage.getItem('userList')),
                ]),
              );
          }
          setText('');
          setList(JSON.parse(localStorage.getItem('userList')));
        }}>
        <input
          type="search"
          maxLength="54"
          className="addInput"
          id={lengthWorning ? 'inputLengthWorning' : null}
          placeholder="Write here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length === 54) setLengthWorning(true);
            else setLengthWorning(false);
          }}
        />
        {lengthWorning && (
          <p className="lengthWorning">Task content can contain max 54 characters.</p>
        )}
        <input type="submit" value="Add" className="addButton" id="addButton" />
      </form>
    </div>
  );
}
