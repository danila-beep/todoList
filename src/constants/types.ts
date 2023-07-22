export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "done" | "notDone"
export type TodoListsList = {
    [key: string]: Array<TaskType>
}