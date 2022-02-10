import { useState, useRef } from "react"; // 解構出來用
import "./App.css";
import TodoItem from "./constants/TodoItem";

let id = 3;
//App 在改變 stats 會重新呼叫
function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            content: "hello",
            isDone: false,
        },
        {
            id: 2,
            content: "hey!yo",
            isDone: true,
        },
    ]);
    //controllered
    const [inputValue, setInputValue] = useState("");

    // uncontrollered
    // let id = useRef(1) // 因為沒有被渲染在畫面，所以用 useRef 就好

    const handleButtonClick = () => {
        if (!inputValue) return;
        setTodos([
            {
                id,
                content: inputValue,
                isDone: false,
            },
            ...todos,
        ]);
        setInputValue("");
        console.log(todos);
        id++;
    };

    //這是更新 input 看到的畫面 跟 顯示
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };
    // 當作 props 把這個傳給子層
    const handleDeleteItem = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    const handleTodoIsDone = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id !== id
                    ? todo
                    : {
                          ...todo,
                          isDone: !todo.isDone,
                      }
            )
        );
    };

    return (
        <div className="App">
            <input type="text" value={inputValue} onChange={handleInputValue} />
            <button
                style={{
                    marginLeft: "5px",
                }}
                onClick={handleButtonClick}
            >
                Add todo
            </button>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleTodoIsDone={handleTodoIsDone}
                    handleDeleteItem={handleDeleteItem}
                />
            ))}
        </div>
    );
}

export default App;
