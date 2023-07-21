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
export type FilterValuesType = "all" | "completed" | "notCompleted"
export type TodoListsList = {
    [key: string]: Array<TaskType>
}