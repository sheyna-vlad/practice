import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";


export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolist1 = v1();
    let todolist2 = v1();

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(), title: 'PoP', isDone: false},
            {id: v1(), title: 'Push', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'unShift', isDone: true},
        ],
    })
    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {
            id: todolist1,
            title: 'What to learn',
            filter: "All"
        },
        {
            id: todolist2,
            title: 'What to eat',
            filter: "All"
        }])

    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId));
        dispatchToTasksReducer(removeTodolistAC(todolistId));
    }
    let addTodolist = (title: string) => {
        dispatchToTodolistsReducer(addTodolistAC(title));
        dispatchToTasksReducer(addTodolistAC(title));
    }
    let changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
    }
    let changeTodoListTitle = (title: string, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, title));
    }


    let removeTask = (id: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    }
    let addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }
    let changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
    }
    let changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, id, newTitle))
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

export default App;
