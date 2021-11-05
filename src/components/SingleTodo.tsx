import React, { useState, useRef, useEffect } from "react";
import Todo from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const [editTodo, setEditTodo] = useState<boolean>(false);
    const [editTodoName, setEditTodoName] = useState<string>(todo.todoName);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map(todo => 
                todo.id === id ? {...todo, todoName: editTodoName} : todo
        ));
        setEditTodo(false);
    };

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        );
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
        );
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [editTodo])

    return <form onSubmit={(e) => handleEdit(e, todo.id)} className="todos__single">
        {
            editTodo ? (
                <input 
                    ref={inputRef}
                    value={editTodoName}
                    onChange={(e) => {setEditTodoName(e.target.value)}}
                    className="todos__single--text"
                />
            ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todoName}</s>
            ) : (
                <span className="todos__single--text">{todo.todoName}</span>
            )
        }
        <div>
            <span 
                onClick={() => {
                    if(!editTodo && !todo.isDone) {
                        setEditTodo(!editTodo);
                    }
                }}
                className="icon">
                <AiFillEdit />
            </span>
            <span onClick={() => handleDelete(todo.id)} className="icon">
                <AiFillDelete />
            </span>
            <span onClick={() => handleDone(todo.id)} className="icon">
                <MdDone />
            </span>
        </div>
    </form>
}

export default SingleTodo;