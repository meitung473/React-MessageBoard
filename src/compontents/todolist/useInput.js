import { useState } from "react";
export default function useInput() {
    const [inputValue, setInputValue] = useState("");
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };
    return {
        inputValue,
        setInputValue,
        handleInputValue,
    };
}
