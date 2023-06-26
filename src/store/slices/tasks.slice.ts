import {createSlice} from "@reduxjs/toolkit";

import {v1} from "uuid";

const initialState = [
    {id: v1(), title: "initial task", isDone: false}
]

//CRUD

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {id: v1(), title: action.payload, isDone: false}
            state.unshift(newTask)
        },
        removeTask: (state, action) => {
            const searchedIndex = state.findIndex(tI => tI.id === action.payload.taskId)
            state.splice(searchedIndex, 1)
        },
        changeTaskTitle: (state, action) => {
            const searchedIndex = state.findIndex(tI => tI.id === action.payload.taskId)
            state[searchedIndex].title = action.payload.newTaskTitle
        },
        changeTaskStatus: (state, action) => {
            const searchedIndex = state.findIndex(tI => tI.id === action.payload.taskId)
            state[searchedIndex].isDone = action.payload.newTaskStatus
        }
    }
})

export const {addTask, removeTask, changeTaskTitle, changeTaskStatus} = tasksSlice.actions

export default tasksSlice.reducer