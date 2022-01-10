
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TaskPriorities,
    tasksReducer, TasksStateType,
    TaskStatuses
} from "./TaskReducer";
import {todoListId_01, todoListId_02} from "./TodoListReducer";
import {v1} from "uuid";


let startState: TasksStateType

beforeEach(() => {
    startState = {
    [todoListId_01]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
    [todoListId_02]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ]
    };

})

test("correct task should be deleted from correct array", () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListId_01]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
    [todoListId_01]: [
        {
            id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
            completed: false, addedDate: "", deadline: "", description: "", startDate: "",
            order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
            completed: false, addedDate: "", deadline: "", description: "", startDate: "",
            order: 0, priority: TaskPriorities.Low
        },
        ]
    });
});


test("correct task should be added to correct array", () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
});

test('task title should change', () => {

    const action = changeTaskTitleAC('2', "new Task", "todolistId2");

    const endState = tasksReducer(startState, action)


    expect(endState["todolistId2"][1].title).toBe("new Task")
});


