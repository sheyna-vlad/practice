import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    taskId: string
    taskIsDone: boolean
    taskTitle: string
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    let onClickRemoveTaskHandler = () => props.removeTask(props.taskId, props.todolistId);
    let onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.todolistId);
    }
    let onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.taskId, newTitle, props.todolistId);
    }, [props.changeTaskTitle, props.taskId, props.todolistId])

    return <li key={props.taskId}
               className={props.taskIsDone ? 'is-done' : ''}>
        <Checkbox
            onChange={onChangeHandlerChecked}
            checked={props.taskIsDone}
        />
        <EditableSpan title={props.taskTitle} onChange={onChangeTaskTitleHandler}/>
        <IconButton onClick={onClickRemoveTaskHandler}><Delete/></IconButton>
    </li>
})