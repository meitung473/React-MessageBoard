// import "./App.css";
import TodoItem from "./constants/TodoItem";
import useTodo from "./useTodo";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

const MemoButton = memo(Button);

//App 在改變 stats 會重新呼叫
function App() {
    const {
        todos,
        handleTodoIsDone,
        handleDeleteItem,
        handleButtonClick,
        inputValue,
        handleInputValue,
    } = useTodo();

    return (
        <div className="App">
            <input type="text" value={inputValue} onChange={handleInputValue} />

            <MemoButton
                style={{
                    marginLeft: "5px",
                }}
                onClick={handleButtonClick}
            >
                Add todo
            </MemoButton>
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
