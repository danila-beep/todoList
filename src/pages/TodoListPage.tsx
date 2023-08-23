import React, { useEffect, useState } from "react"
import AddItemForm from "components/AddItemForm/AddItemForm"
import Preloader from "components/Preloader/Preloader"
import TodoList from "components/TodoList/TodoList"
import { addTodoTC, getTodoTC, todoListsActions } from "store/slices/todoLists.slice"
import { useSelector } from "react-redux"
import { TodoListsState } from "constants/types"
import { RootStateType, useAppDispatch } from "store/store"
import { useNavigate } from "react-router-dom"
import LinearPreloader from "components/Preloader/LinearPreloader"

const TodoListPage = () => {
    const todoListsState = useSelector<RootStateType, TodoListsState>((state) => state.todoLists)
    const isLoggedIn = useSelector((state: RootStateType) => state.auth.isLoggedIn)
    console.log(isLoggedIn)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            console.log("gettodolist")
            dispatch(getTodoTC())
        } else {
            navigate("/login")
        }
        return () => {
            dispatch(todoListsActions.clearTodoLists())
            
        }
    }, [dispatch, isLoggedIn, navigate])

    const [addTodoListInputValue, setAddTodoListInputValue] = useState("")
    const [addItemError, setAddItemError] = useState<boolean>(false)
    const addTodoListHandler = () => {
        if (addTodoListInputValue === "" || addTodoListInputValue === undefined) {
            setAddItemError(true)
        } else if (addTodoListInputValue.length > 0) {
            dispatch(addTodoTC(addTodoListInputValue))
            setAddTodoListInputValue("")
        }
    }

    const addTodoInputSetter = (value: string) => {
        setAddTodoListInputValue(value)
        setAddItemError(false)
    }

    //   if (!isLoggedIn) {
    //     return <Navigate to={"/login"} />;
    //   }

    return (
        <div>
            <AddItemForm
                addingElement={"TodoList"}
                onClick={addTodoListHandler}
                value={addTodoListInputValue}
                onChange={addTodoInputSetter}
                keyPressAllow
            />
            {addItemError ? <div className="errorMessage">Title is hard required</div> : undefined}
            {todoListsState.isFetching ? (
                <LinearPreloader />
            ) : (
                <div className="todoListsList">
                    {todoListsState.todoLists.map((todoList, index) => {
                        return <TodoList todoList={todoList} key={todoList.id} />
                    })}
                </div>
            )}
        </div>
    )
}

export default TodoListPage
