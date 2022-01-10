import {
    ActionsType,
    FilterTasksType, removeTodoListAC,
    TodoListDomainType,
    todoListId_01,
    todoListId_02,
    todoListReducer
} from "./TodoListReducer";

let startState: Array<TodoListDomainType>

beforeEach(() => {

    startState = [
        {id: todoListId_01, title: "WantTo sell", filter: "all", addedDate: "", order: 0},
        {id: todoListId_02, title: "Want to buy", filter: "all", addedDate: "", order: 0},
    ]
})

test("correct todolist should be removed", () => {

    const endState = todoListReducer(startState, removeTodoListAC(todoListId_01))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_02);
});


test("correct todolist should be added", () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListReducer(startState, {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
        todoListId: todoListId_02
    })

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";

    const action: ActionsType = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListId_02,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("WantTo sell");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test("correct filter of todolist should be changed", () => {
    let newFilter: FilterTasksType = "completed";

    const action: ActionsType = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todoListId_02,
        filter: newFilter
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
