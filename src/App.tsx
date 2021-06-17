import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";



export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<taskType>
}

function App() {

    let todolist1 = v1();
    let todolist2 = v1();

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'PoP', isDone: false},
            {id: v1(), title: 'Push', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'unShift', isDone: true},
        ],
    })
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
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
        let filtredTodolists = todolists.filter(td => td.id !== todolistId);
        setTodolists([...filtredTodolists]);

    }
    let addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: "All"}
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            [newTodolistId]: [],
            ...tasks
        })
    }
    let changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        todolist && (todolist.filter = value);
        setTodolists([...todolists]);

    }
    let changeTodoListTitle = (title: string, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        todolist && (todolist.title = title);
        setTodolists([...todolists]);
    }

    let removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let filteredTasks = todolistTasks.filter(t => t.id !== id);
        tasks[todolistId] = [...filteredTasks];
        setTasks({...tasks});
    }
    let addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        const newTask: taskType = {id: v1(), title, isDone: false};
        tasks[todolistId] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }
    let changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        task && (task.isDone = isDone);
        setTasks({...tasks});
    }
    let changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let tasksTarget = todolistTasks.find(t => t.id === id);
        tasksTarget && (tasksTarget.title = newTitle);
        setTasks({...tasks})
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
                                <Grid item >
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
