import { useState, useContext, createContext } from "react";

const TitleContext = createContext();
const ColorContext = createContext();

function InInnerButton() {
    const setTitle = useContext(TitleContext);
    const colors = useContext(ColorContext);
    return (
        <div>
            <button
                style={{ color: colors.primary }}
                onClick={() => {
                    setTitle(Math.random());
                }}
            >
                Update Title
            </button>
        </div>
    );
}

function InnerButton() {
    return <InInnerButton />;
}

function OuterButton() {
    return <InnerButton />;
}

export default function Demo() {
    const [title, setTitle] = useState("This is title");
    const [colors, setColor] = useState({
        primary: "red",
    });
    return (
        <ColorContext.Provider value={colors}>
            <TitleContext.Provider value={setTitle}>
                <div>
                    <button
                        onClick={() => {
                            setColor(() =>
                                colors.primary === "red"
                                    ? {
                                          primary: "blue",
                                      }
                                    : {
                                          primary: "red",
                                      }
                            );
                        }}
                    >
                        click me
                    </button>
                    title:{title}
                    <OuterButton></OuterButton>
                </div>
            </TitleContext.Provider>
        </ColorContext.Provider>
    );
}
