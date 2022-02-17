import { useState, useEffect, useRef, useCallback } from "react";
import useInput from "./useInput";

function writeTodosLocalStroage(todos) {
    window.localStorage.setItem("todos", JSON.stringify(todos));
}
export default function useTodo() {
    const { inputValue, setInputValue, handleInputValue } = useInput();
    let id = useRef(1);
    const [todos, setTodos] = useState(() => {
        let todoData = JSON.parse(window.localStorage.getItem("todos")) || "";
        if (todoData.length) {
            id.current = todoData[0].id + 1;
        } else {
            todoData = [];
        }
        return todoData;
    });
    useEffect(() => {
        writeTodosLocalStroage(todos);
        return () => {};
    }, [todos]);

    const handleButtonClick = useCallback(() => {
        if (!inputValue) return;
        setTodos([
            {
                id: id.current,
                content: inputValue,
                isDone: false,
            },
            ...todos,
        ]);
        setInputValue("");
        id.current++;
    }, [inputValue, setInputValue, todos]);

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
    return {
        id,
        todos,
        setTodos,
        handleTodoIsDone,
        handleDeleteItem,
        handleButtonClick,
        inputValue,
        setInputValue,
        handleInputValue,
    };
}
