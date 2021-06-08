import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FiletValueType = 'All' | 'Active' | 'Completed';
export type TodoListType = {
    id: string
    title: string
    filter: FiletValueType
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

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
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


    let changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        task && (task.isDone = isDone);
        setTasks({...tasks});
    }
    let addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        const newTask: taskType = {id: v1(), title, isDone: false};
        tasks[todolistId] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }
    let remove = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let filteredTasks = todolistTasks.filter(t => t.id !== id);
        tasks[todolistId] = [...filteredTasks];
        setTasks({...tasks});
    }

    let changeFilter = (value: FiletValueType, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        todolist && (todolist.filter = value);
        setTodolists([...todolists]);

    }
    let addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodoListType = {id: v1(), title, filter: "All"}
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            [newTodolistId]: [],
            ...tasks
        })
    }


    return (

        <div className="App">

            <AddItemForm addItem={addTodolist}/>

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
                        <Todolist
                            key={td.id}
                            id={td.id}
                            title={td.title}
                            removeTask={remove}
                            filter={td.filter}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            task={tasksForTodolist}
                            removeTodolist={removeTodolist}


                        />
                    )
                })
            }

        </div>
    );
}

export default App;
