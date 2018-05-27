import styled, { css } from "styled-components";

export const Todo = styled.div`
  margin: 20px;
`

export const TodoButton = styled.button`
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  background-color: #78909C;
  color: #fff;
  text-shadow: 0px 1px 0.05em black;
`

export const TodoList = styled.div`

`

export type TodoItemProps = React.HTMLAttributes<HTMLDivElement> & {
  isCompleted?: boolean,
  isRemoved?: boolean
}

export const TodoItem = styled<TodoItemProps, 'div'>('div')`
  display: flex;
  align-items: center;
  background-color: #2196F3;
  border: 2px solid rgba(0, 0, 0, 0.11);
  margin: 5px 0;
  border-radius: 3px;
  color: #fff;
  text-shadow: 0px 1px 0.1em black;

  ${({ isCompleted = false }) => isCompleted && css`
    text-decoration: line-through;
  `}

  ${({ isRemoved = false }) => isRemoved && css`
    opacity: 0.5;
  `}
`

export const TodoItemCol = styled.div`
  flex-flow: column;
  padding: 5px;
`