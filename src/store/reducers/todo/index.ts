import { TodoAction, TodoActionEnum, TodoState } from "./types"

const initialState: TodoState = {
    todoList: [],
    isLoading: false,
    error: ''
}

export default function todoReducer(state = initialState, action: TodoAction): TodoState {
    switch (action.type) {
        case TodoActionEnum.GET_TODO:
            return { ...state, todoList: action.payload }
        case TodoActionEnum.ADD_TODO:
            return { ...state, todoList: state.todoList.concat(action.payload) }
        case TodoActionEnum.UPDATE_TODO:
            return { ...state, todoList: state.todoList.map(todo => todo._id === action.payload._id ? action.payload : todo) }
        case TodoActionEnum.DELETE_TODO:
            return { ...state, todoList: state.todoList.filter(todo => todo._id !== action.payload) }
        case TodoActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case TodoActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        default:
            return state
    }
}