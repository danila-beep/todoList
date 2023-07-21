import {v1} from "uuid";
import {addTask, todoListId_1} from "../tasks.slice";
import {useDispatch} from "react-redux";

test("task should be addded to correct todoList", () => {
    const startState = {
        [todoListId_1]: [
            {id: v1(), title: "initial task", isDone: false}
        ]
    }
})