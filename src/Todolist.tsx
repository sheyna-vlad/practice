import React, {ChangeEvent} from "react";
import {FiletValueType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    task: Array<taskType>
    removeTask: (id: string, todolistId: string) => void
    filter: FiletValueType
    changeFilter: (value: FiletValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}


export function Todolist(props: TodoListPropsType) {


    let changeFilter = (e: any) => {
        props.changeFilter(e.currentTarget.innerHTML, props.id)
    }

    let addTaskHandler = (title: string) => {
        if (title && title.trim() !== '') {
            props.addTask(title, props.id);
        }
    }

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>

            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolist}>x</button>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {props.task
                    .map(t => {

                        let onClickHandler = () => props.removeTask(t.id, props.id);
                        let onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
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



