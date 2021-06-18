import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./App";

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
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodoListTitle: (newTitle: string, todolistId: string) => void
}


export function Todolist(props: TodoListPropsType) {


    const onAllClickHandler = () => props.changeFilter('All', props.id)
    const onActiveClickHandler = () => props.changeFilter('Active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('Completed', props.id)

    let addTaskHandler = (title: string) => {
        if (title && title.trim() !== '') {
            props.addTask(title, props.id);
        }
    }

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id);
    }

    return (
        <div>

            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton color={'primary'} onClick={onClickRemoveTodolist}><HighlightOffIcon/></IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>
                {props.task.map(t => {

                        let onClickRemoveTaskHandler = () => props.removeTask(t.id, props.id);
                        let onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        }
                        let onChangeTaskTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id);
                        }

                        return <li key={t.id}
                                   className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                onChange={onChangeHandlerChecked}
                                checked={t.isDone}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
                            <IconButton onClick={onClickRemoveTaskHandler}><Delete/></IconButton>
                        </li>
                    })}
            </ul>


            <div style={{paddingTop: '10px'}}>
                <Button variant={props.filter === 'All' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                        color={'primary'}>All
                </Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'primary'}>Completed
                </Button>
            </div>

        </div>
    )

}


