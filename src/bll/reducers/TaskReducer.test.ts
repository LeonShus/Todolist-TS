import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskPriorities,
    tasksReducer,
    TasksStateType,
    TaskStatuses
} from "./TaskReducer";
import {todoListId_01, todoListId_02} from "./TodoListReducer";


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

    const action = removeTaskAC("2", todoListId_02);

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

    const action = addTaskAC("juce", todoListId_02);

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId_01].length).toBe(2);
    expect(endState[todoListId_02].length).toBe(3);
    expect(endState[todoListId_02][0].id).toBeDefined();
    expect(endState[todoListId_02][0].title).toBe("juce")
    expect(endState[todoListId_02][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {

    const action = changeTaskStatusAC("2", TaskStatuses.Completed, todoListId_02);

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId_01][1].status).toBe(TaskStatuses.New);
    expect(endState[todoListId_02][1].status).toBe(TaskStatuses.Completed);
});

test("task title should change", () => {

    const action = changeTaskTitleAC("2", "new Task", todoListId_02);

    const endState = tasksReducer(startState, action)


    expect(endState[todoListId_02][1].title).toBe("new Task")
});


