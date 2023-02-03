import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import "./App.css";

function App() {
  /** 시간 */
  const start = new Date();
  let Mt =
    start.getMonth() + 1 < 10
      ? `0${start.getMonth() + 1}`
      : start.getMonth() + 1;
  let D = start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();
  let H = start.getHours() < 10 ? `0${start.getHours()}` : start.getHours();
  let M =
    start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();
  let S =
    start.getSeconds() < 10 ? `0${start.getSeconds()}` : start.getSeconds();
  /** 현재 시간  */
  let pTime = `${Mt}/${D} ${H} : ${M} : ${S}`;
  /** useEffect 첫 실행 막기 */
  const didMount = useRef(true);
  /** 페이지 로드시 input에 focus */
  const inputRef = useRef();
  /** input 값 */
  const [todo, setTodo] = useState("");
  /** 시간 */
  const [time, setTime] = useState(pTime);
  /** 리스트 값 */
  const [list, setList] = useState([]);
  /** submit당시 새로고침 막아주기 + 리스트에 input값 저장 */
  const onSubmit = (e) => {
    e.preventDefault();
    onTime();
    list.push({ 할것: todo, 시간: pTime });
    setList([...list]);
    setTodo("");
  };
  /** 시간 담기 */
  const onTime = () => {
    setTime(pTime);
  };
  /** input 값에 담기 */
  const onchange = (e) => setTodo(e.target.value);
  /** 리스트의 값 제거 */
  const removeList = (i) => {
    list.splice(i, 1);
    setList([...list]);
  };

  useEffect(() => {
    if (didMount.current) {
      inputRef.current.focus();
      if (localStorage.getItem("todoList") !== null)
        setList(JSON.parse(localStorage.getItem("todoList")));
      didMount.current = false;
      return;
    }

    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  return (
    <div className="w-full">
      <div className="todolist">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="title">todolist</div>

          <div>
            <div className="inputWrap">
              <form action="" onSubmit={onSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={todo}
                  onChange={onchange}
                  className=""
                  placeholder="할게 무엇인가요?"
                />
                <IconContext.Provider value={{ color: "black" }}>
                  <button>
                    <FaCheck></FaCheck>
                  </button>
                </IconContext.Provider>
                ;
              </form>
            </div>
            <div className="mt-10 mb-5">
              {list.map((i, key) => {
                return (
                  <div key={key} className="listWrap">
                    <div className="list">
                      <div className="listIndex">{i.할것}</div>
                      <div style={{ fontSize: "12px" }}>{i.시간}</div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      <IconContext.Provider value={{ color: "red" }}>
                        <FaTrashAlt
                          size={28}
                          onClick={() => {
                            removeList(key);
                          }}
                        ></FaTrashAlt>
                      </IconContext.Provider>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
