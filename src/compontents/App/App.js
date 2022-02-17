import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";

const API_ENDPOINT =
    "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";
const API = "https://student-json-api.lidemy.me/comments";
const Page = styled.div`
    margin: 0 auto;
    width: 350px;
`;

const Title = styled.h2`
    text-align: center;
`;

const MessageForm = styled.form`
    width: 100%;
`;

const MessageTextArea = styled.textarea`
    display: block;
    min-width: 100%;
    max-width: 350px;
    margin-top: 8px;
`;
const MessageList = styled.div`
    margin-top: 10px;
`;

const MessageSubmitButton = styled.input.attrs({
    type: "submit",
    value: "送出留言",
})`
    margin-top: 10px;
`;
const MessageContainer = styled.div`
    width: 100%;
    border: 1px solid black;

    & + & {
        margin-top: 8px;
    }
`;
const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px dashed gray;
`;
const MessageAuthor = styled.div`
    color: rgb(100, 53, 60);
`;
const MessageCreatedAt = styled.div`
    color: #aaa;
`;
const MessageBody = styled.div`
    padding: 8px 16px;
`;
const MessageContent = styled.p``;

const ErrorMessage = styled.div`
    margin-top: 8px;
    padding: 10px;
    background: rgba(255, 0, 0, 0.3);
    border-radius: 5px;
`;

const Loading = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: white;
`;
const MessageFooter = styled.div`
    border-top: 1px solid black;
    display: flex;
    justify-content: end;
`;
const DangerButton = styled.a`
    border: 1px solid black;
    padding: 5px;
    margin: 5px;
    background-color: rgb(200, 0, 0);
    color: white;
    curosr: pointer;
    text-decoration: none;
`;
function Message({
    nickname,
    created_at,
    children,
    handleDeletPost,
    $message,
}) {
    return (
        <MessageContainer>
            <MessageHeader>
                <MessageAuthor>{nickname}</MessageAuthor>
                <MessageCreatedAt>{created_at}</MessageCreatedAt>
            </MessageHeader>
            <MessageBody>
                <MessageContent>{children}</MessageContent>
            </MessageBody>
            <MessageFooter>
                <DangerButton
                    href={API + "/" + $message.id}
                    onClick={(e) => {
                        e.preventDefault();
                        handleDeletPost($message.id);
                    }}
                >
                    刪除
                </DangerButton>
            </MessageFooter>
        </MessageContainer>
    );
}

function App() {
    // 從後端來回來的資料
    const [messages, setMessage] = useState(null);
    // errMessage 處理
    const [apiErrorMessage, setapiErrorMessage] = useState(null);
    const [nicknameValue, setNicknameValue] = useState("");
    const [textAreaValue, setTextAreaValue] = useState("");
    const [postMessageError, setpostMessageError] = useState(null);
    const [isPostmessageLoading, setPostmessageLoading] = useState(false);

    function fetchMessage() {
        return fetch(API_ENDPOINT)
            .then((res) => res.json())
            .then((data) => {
                setMessage(data);
            })
            .catch((err) => setapiErrorMessage(err.message));
    }
    //在 render 後只做一次
    useEffect(() => {
        fetchMessage();
    }, []);

    function handleButtonSubmit(e) {
        e.preventDefault();
        if (isPostmessageLoading) return;

        setPostmessageLoading(true);
        fetch("https://student-json-api.lidemy.me/comments", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                nickname: nicknameValue,
                body: textAreaValue,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok === 0) {
                    setpostMessageError(data.message);
                    setPostmessageLoading(false);
                    return;
                }
                setTextAreaValue("");
                setPostmessageLoading(false);
                fetchMessage();
            })
            .catch((err) => {
                setpostMessageError(err.message);
                setPostmessageLoading(false);
            });
    }
    const handleNicknameValueChange = (e) => setNicknameValue(e.target.value);
    const handleTextAreaChange = useCallback(
        (e) => {
            return setTextAreaValue(e.target.value);
        },
        [textAreaValue]
    );
    const handleTextAreaOnFocus = (e) => {
        setpostMessageError(null);
    };
    const handleNicknameValueOnFocus = (e) => {
        setpostMessageError(null);
    };
    const handleDeletPost = (id) => {
        fetch(API + "/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    setMessage(messages.filter((message) => message.id !== id));
                }
            })
            .catch((err) => setapiErrorMessage(err.message));
    };

    return (
        <Page>
            <p
                style={{
                    textAlign: "center",
                    padding: "5px",
                }}
            >
                此為練習，留言的 API 來自 <a href={API}>這裡</a>
            </p>
            {isPostmessageLoading && <Loading>Loading...</Loading>}
            <Title>React 留言板</Title>

            <MessageForm onSubmit={handleButtonSubmit}>
                您的暱稱 :
                <input
                    type="text"
                    vaule={nicknameValue}
                    onChange={handleNicknameValueChange}
                    onFocus={handleNicknameValueOnFocus}
                    style={{
                        marginLeft: "5px",
                    }}
                />
                <MessageTextArea
                    rows={8}
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    onFocus={handleTextAreaOnFocus}
                />
                <MessageSubmitButton />
                {messages && messages.length === 0 && <div>No messages!</div>}
                {postMessageError && (
                    <ErrorMessage>
                        Something is wrong. {postMessageError.toString()}
                    </ErrorMessage>
                )}
            </MessageForm>
            {apiErrorMessage && (
                <ErrorMessage>
                    Something is wrong. {apiErrorMessage.toString()}
                </ErrorMessage>
            )}
            <MessageList>
                {messages &&
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            $message={message}
                            handleDeletPost={handleDeletPost}
                            nickname={message.nickname}
                            created_at={new Date(
                                message.createdAt
                            ).toLocaleString()}
                        >
                            {message.body}
                        </Message>
                    ))}
            </MessageList>
        </Page>
    );
}

export default App;

Message.proptype = {
    $id: PropTypes.number,
    author: PropTypes.string,
    created_at: PropTypes.string,
    children: PropTypes.node,
};
