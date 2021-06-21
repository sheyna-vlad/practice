import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {FilterValuesType} from "./App";
import {Task} from "./Task";

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


export const Todolist = React.memo((props: TodoListPropsType) => {


    const onAllClickHandler = useCallback(() =>
        props.changeFilter('All', props.id), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter('Active', props.id), [props.id, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter('Completed', props.id), [props.id, props.changeFilter]);

    let addTaskHandler = useCallback((title: string) => {
        if (title && title.trim() !== '') {
            props.addTask(title, props.id);
        }
    }, [props.addTask, props.id]);
    const onClickRemoveTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    },[props.id,props.removeTodolist])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id);
    }, [props.changeTodoListTitle,props.id]);

    let tasksForTodolist = props.task;

    if (props.filter === 'Completed') {
        tasksForTodolist = props.task.filter(t => t.isDone)
    }
    if (props.filter === 'Active') {
        tasksForTodolist = props.task.filter(t => !t.isDone)
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
                {tasksForTodolist.map(t => {

                    return <Task changeTaskStatus={props.changeTaskStatus}
                                 changeTaskTitle={props.changeTaskTitle}
                                 removeTask={props.removeTask}
                                 todolistId={props.id}
                                 taskId={t.id}
                                 taskIsDone={t.isDone}
                                 taskTitle={t.title}
                                 key={t.id}/>
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

});


