import React, { FC, useCallback } from "react"
import s from "./task.module.css"
import { UilTrashAlt, UilUser } from "@iconscout/react-unicons"
import { changeTaskStatusTC, removeTaskTC } from "store/slices/tasks.slice"
import CheckBox from "../CheckBox/CheckBox"
import EditableSpan from "../EditableSpan/EditableSpan"
import { TaskStatuses } from "api/todoistAPI"
import { useAppDispatch } from "store/store"

type TaskPropsType = {
    todoListId: string
    taskId: string
    taskTitle: string
    taskStatus: TaskStatuses
}

const Task: FC<TaskPropsType> = React.memo((props) => {
    const dispatch = useAppDispatch()

    const removeButtonHandler = useCallback(() => {
        dispatch(removeTaskTC(props.todoListId, props.taskId))
    }, [props.todoListId, props.taskId, dispatch])

    const changeTaskStatusHandler = useCallback(() => {
        const taskStatusSwitcher = () => {
            if (props.taskStatus === 2) {
                return 0
            } else return 2
        }
        dispatch(changeTaskStatusTC(props.todoListId, props.taskId, taskStatusSwitcher()))
    }, [props.todoListId, props.taskId, dispatch, props.taskStatus])

    const taskIsDoneChecker = () => {
        if (props.taskStatus > 0) {
            return true
        } else return false
    }

    return (
        <div className={s.taskWrapper}>
            <div className={s.taskBody}>
                <h3>
                    <EditableSpan
                        elementId={props.taskId}
                        todoListId={props.todoListId}
                        elementTitle={props.taskTitle}
                        spanFor={"task"}
                    />
                </h3>
                <CheckBox isChecked={taskIsDoneChecker()} onChange={changeTaskStatusHandler} />
            </div>
            <div className={s.taskFooter}>
                <div className={s.users}>
                    <div>
                        <UilUser size={15} />
                    </div>
                    <div>
                        <UilUser size={15} />
                    </div>
                    <div>
                        <UilUser size={15} />
                    </div>
                </div>
                <UilTrashAlt className={s.deleteIcon} onClick={removeButtonHandler} />
            </div>
        </div>
    )
})

export default Task
