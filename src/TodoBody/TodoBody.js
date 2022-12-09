import './TodoBody.scss';
import { v4 as uuidv4 } from 'uuid';

export default function TodoBody({ setList, setDeleted, setRemoveId }) {
  return (
    <div className="todoBody" key={uuidv4()}>
      {localStorage.getItem('userList')
        ? localStorage.getItem('userList').length &&
          JSON.parse(localStorage.getItem('userList')).map((el) => {
            return (
              <div key={uuidv4()} className="todoBodyList" id={el.hiddened ? 'displayHidden' : ''}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={el.isComplited}
                  onChange={(event) => {
                    localStorage.setItem(
                      'userList',
                      JSON.stringify(
                        JSON.parse(localStorage.getItem('userList')).map((elem) => {
                          if (el.id === elem.id) {
                            return {
                              ...elem,
                              isComplited: event.target.checked,
                            };
                          }
                          return elem;
                        }),
                      ),
                    );
                    setList(JSON.parse(localStorage.getItem('userList')));
                  }}
                />
                <p className={el.isComplited ? 'opacityTask' : null} id="taskTag">
                  {el.text}
                </p>
                <button
                  onClick={() => {
                    setDeleted(true);
                    setRemoveId(el.id);
                  }}>
                  X
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}
