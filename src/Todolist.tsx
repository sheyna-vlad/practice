import React, {ChangeEvent, useState} from "react";
import {FiletValueType} from "./App";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    task: Array<taskType>
    removeTask: (id: string) => void
    filter: FiletValueType
    changeFilter: (value: FiletValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    id:string

}


export const Todolist: React.FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    let changeFilter = (e: any) => {
        props.changeFilter(e.currentTarget.innerHTML)
    }
    let onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let addTaskHandler = () => {
        if (title && title.trim() !== '') {
            props.addTask(title);
            setTitle(' ');
        } else {
            setError('Title is required')
        }

    }
    const onKeyPressHandler = (e: any) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler();
        }

    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeTaskTitle}
                       onKeyPress={onKeyPressHandler}
                       value={title}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.task
                    .map(t => {

                        let onClickHandler = () => props.removeTask(t.id);
                        let onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue);
                        }

                        return <li key={t.id}
                                   className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox'
                                   onChange={onChangeHandlerChecked}
                                   checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })}
            </ul>


            <button onClick={changeFilter}>All</button>
            <button onClick={changeFilter}>Active</button>
            <button onClick={changeFilter}>Completed</button>

        </div>
    )
}