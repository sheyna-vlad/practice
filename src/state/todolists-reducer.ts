import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolist1, todolist2} from "./task-reducer";


export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = removeTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> =  [
    {
        id: todolist1,
        title: 'What to learn',
        filter: "All"
    },
    {
        id: todolist2,
        title: 'What to eat',
        filter: "All"
    }]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            return [ ...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'All'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let stateCopy = [...state];
            let todolist = stateCopy.find(td => td.id === action.id);
            todolist && (todolist.title = action.title);
            return [...stateCopy]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let stateCopy = [...state]
            let todolist = stateCopy.find(td => td.id === action.id);
            todolist && (todolist.filter = action.filter);
            return [...stateCopy]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter}
}