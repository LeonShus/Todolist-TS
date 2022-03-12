import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC,
    TaskPriorities,
    tasksReducer,
    TasksStateType,
    TaskStatuses
} from "./TaskReducer";

export const todoListId_01 = v1()
export const todoListId_02 = v1()

let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todoListId_01]: [
            {
                id: "1", title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
        [todoListId_02]: [
            {
                id: "1", title: "HTML", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "CSS", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ]
    };

})

test("correct task should be deleted from correct array", () => {

    const action = removeTaskAC({todoListId: todoListId_02, taskId: "2"});

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListId_01]: [
            {
                id: "1", title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
        [todoListId_02]: [
            {
                id: "1", title: "HTML", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ]
    });
});


test("correct task should be added to correct array", () => {
    const task = {
        id: "1", title: "juce", status: TaskStatuses.New, todoListId: todoListId_02,
        completed: false, addedDate: "", deadline: "", description: "", startDate: "",
        order: 0, priority: TaskPriorities.Low
    }

    const action = addTaskAC({todoListId: todoListId_02, task: task});

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId_01].length).toBe(2);
    expect(endState[todoListId_02].length).toBe(3);
    expect(endState[todoListId_02][0].id).toBeDefined();
    expect(endState[todoListId_02][0].title).toBe("juce")
    expect(endState[todoListId_02][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {

    const action = changeTaskStatusAC({
        id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: todoListId_02,
        completed: false, addedDate: "", deadline: "", description: "", startDate: "",
        order: 0, priority: TaskPriorities.Low
    });
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId_01][1].status).toBe(TaskStatuses.New);
    expect(endState[todoListId_02][0].status).toBe(TaskStatuses.Completed);
});

test("task title should change", () => {

    const task = {
        id: "1", title: "new Task", status: TaskStatuses.Completed, todoListId: todoListId_02,
        completed: false, addedDate: "", deadline: "", description: "", startDate: "",
        order: 0, priority: TaskPriorities.Low
    }

    const action = changeTaskTitleAC(task);

    const endState = tasksReducer(startState, action)


    expect(endState[todoListId_02][0].title).toBe("new Task")
});


