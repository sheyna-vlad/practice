import React, {useCallback} from 'react';
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



    let removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    },[dispatch]);
    let addTodolist =useCallback( (title: string) => {
        dispatch(addTodolistAC(title));
    },[dispatch]);
    let changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    },[dispatch]);
    let changeTodoListTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    },[dispatch]);


    let removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    },[dispatch]);
    let addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    },[dispatch]);
    let changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    },[dispatch]);
    let changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    },[dispatch]);


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
                            let tasksForTodolist = tasks[td.id];

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
