import styled from 'styled-components'

const TodoItemWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items : center;
  background : #fff;
  box-shadow : 2px 2px 5px rgba(0,0,0,.3);
  padding: 5px;
  border: 1px solid grey;
  margin-top : 5px;
`
const TodoContent = styled.div`
  margin-left : 5px;
  color : ${props => props.theme.colors.primary_500};
  ${props=> props.isDone && `text-decoration : line-through`}
`
const TodoButtonWrapper=styled.div``

const Button = styled.button`
  padding: 5px;
  border-radius : 3px;
  border: 1px solid #bbb;
  box-shadow: 1px 3px 3px rgba(0,0,0,.3);
  &+&{
    margin-left:4px;
  }
  &:hover{
    cursor : pointer;
  }
 
`
const DangerButton = styled(Button)`
  color : white;
  background : rgb(200,50,0);
`


export default function TodoItem({todo,handleDeleteItem,handleTodoIsDone}){
  const handleDelete = ()=>{
    handleDeleteItem(todo.id)
  }
  const handleIsDone =()=>{
    handleTodoIsDone(todo.id)
  }
  return(
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleIsDone}>
          {todo.isDone ? '未完成':'已完成'}
        </Button>
        <DangerButton onClick={handleDelete}>刪除</DangerButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  )
}
