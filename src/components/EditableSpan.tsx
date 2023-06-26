import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {changeTaskTitle} from "../store/slices/tasks.slice";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../store/store";

type EditableSpanPropsType = {
    elementId: string,
    elementTitle: string
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const dispatch = useDispatch<AppDispatchType>();

    const [isEditMode, setIsEditMode] = useState(false);
    const [inputOfNewTaskTitle, setInputOfNewTaskTitle] = useState<string>("");

    const inputOfNewTitleOnChangeHandler = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setInputOfNewTaskTitle(event.currentTarget.value)
    };

    const inputOnKeyDownHandler = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            dispatch(
                changeTaskTitle({
                    taskId: props.elementId,
                    newTaskTitle: inputOfNewTaskTitle,
                })
            );
            setIsEditMode(false)
        }
    }

    return (
        <div>
            {isEditMode
                ? (
                    <input
                        onKeyDown={inputOnKeyDownHandler}
                        value={inputOfNewTaskTitle}
                        onChange={inputOfNewTitleOnChangeHandler}
                    />
                )
                : (
                    <div onDoubleClick={() => setIsEditMode(!isEditMode)}>{props.elementTitle}</div>
                )}
        </div>
    );
};

export default EditableSpan;