import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FiletValueType = 'All' | 'Active' | 'Completed';
export type TodoListType = {
    id: string
    title: string
    filter: FiletValueType
}

function App() {


    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: 'PoP', isDone: false},
        {id: v1(), title: 'Push', isDone: false},
        {id: v1(), title: 'unShift', isDone: true},
    ])
    const [filter, setFilter] = useState<FiletValueType>('All');
    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: "All"
        },
        {
            id: v1(),
            title: 'What to eat',
            filter: "All"
        }])


    let changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        task && (task.isDone = isDone);
        setTasks([...tasks]);
    }
    let addTask = (title: string) => {
        const newTask: taskType = {id: v1(), title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    let remove = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    let changeFilter = (value: FiletValueType) => {
        setFilter(value);
    }

    let filteredTask = tasks;

    if (filter === 'Completed') {
        filteredTask = tasks.filter(t => t.isDone)
    }
    if (filter === 'Active') {
        filteredTask = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">{
            todolists.map(td => {
                return <Todolist
                    key={td.id}
                    id={td.id}
                    title={td.title}
                    removeTask={remove}
                    filter={td.filter}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    task={filteredTask}



                />
            })
        }

        </div>
    );
}

export default App;
