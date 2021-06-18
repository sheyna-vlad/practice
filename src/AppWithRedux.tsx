import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./state/store";
import {TasksStateType} from "./App";


export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {


    const dispatch = useDispatch();

    const tasks = useSelector<rootStateType, TasksStateType>(state => state.tasks);
    const todolists = useSelector<rootStateType, Array<TodolistType>>(state => state.todolists);



    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }
    let addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }
    let changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }
    let changeTodoListTitle = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }


    let removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }
    let addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }
    let changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }
    let changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }


    return (

        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={10}>
                    {
                        todolists.map(td => {
                            let allTodolistTasks = tasks[td.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (td.filter === 'Completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }
                            if (td.filter === 'Active') {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }


                            return (
                                <Grid item>
                                    <Paper style={{padding: "20px"}}>
                                        <Todolist
                                            key={td.id}
                                            id={td.id}
                                            title={td.title}
                                            removeTask={removeTask}
                                            filter={td.filter}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            task={tasksForTodolist}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}

                                        />
                                    </Paper>
                                </Grid>


                            )
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
