import styled from "styled-components";


export const TodoItemStyled = styled.li`
    display: flex;
    list-style-type: none;
    margin: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    & > * {
        margin: 0 10px;
    }
    span {
        flex-grow: 1;
        text-align: left;
    }
    button {
        margin: 0 10px;
        background: none;
        border: none;
    }
    input {
        margin: 0 10px;
    }
`