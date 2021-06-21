import {v1} from "uuid";
import {TasksStateType} from "../App";
import {taskType} from "../Todolist";
import {AddTodolistActionType, removeTodolistActionType} from "./todolists-reducer";


export type removeTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type addTaskAT = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistId: string
}
export type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    taskStatus: boolean
    todolistId: string
}
export type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = removeTaskAT | addTaskAT
    | changeTaskStatusAT | changeTaskTitleAT
    | AddTodolistActionType | removeTodolistActionType

export let todolist1 = v1();
export let todolist2 = v1();

const initialState = {
    [todolist1]: [
        {id: v1(), title: 'PoP', isDone: false},
        {id: v1(), title: 'Push', isDone: false},
    ],
    [todolist2]: [
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'unShift', isDone: true},
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const todolist = state[action.todolistId];
            stateCopy[action.todolistId] = todolist.filter(t => t.id !== action.taskId);
            return stateCopy;
        }

        case 'ADD-TASK': {
            let stateCopy = {...state};
            let tasks = state[action.todolistId];
            let newTask: taskType = {id: v1(), title: action.taskTitle, isDone: false};
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.taskStatus}
                    : t)
            return {...state};
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return {...state};
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }


        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (taskTitle: string, todolistId: string): addTaskAT => {
    return {type: 'ADD-TASK', taskTitle, todolistId}
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): changeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId, taskStatus, todolistId}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}
