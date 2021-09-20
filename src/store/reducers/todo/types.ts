import { ITodo } from "../../../models/ITodo";

export interface TodoState {
    todoList: ITodo[];
    isLoading: boolean;
    error: string;
}

export enum TodoActionEnum {
    GET_TODO = 'GET_TODO',
    ADD_TODO = 'ADD_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    DELETE_TODO = 'DELETE_TODO',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR'
}

export interface GetTodoAction {
    type: TodoActionEnum.GET_TODO;
    payload: ITodo[];
}

export interface AddTodoAction {
    type: TodoActionEnum.ADD_TODO;
    payload: ITodo;
}

export interface UpdateTodoAction {
    type: TodoActionEnum.UPDATE_TODO;
    payload: ITodo;
}

export interface DeleteTodoAction {
    type: TodoActionEnum.DELETE_TODO;
    payload: string | undefined;
}

export interface SetIsLoadingAction {
    type: TodoActionEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: TodoActionEnum.SET_ERROR;
    payload: string;
}

export type TodoAction =
    GetTodoAction
    | AddTodoAction
    | UpdateTodoAction
    | DeleteTodoAction
    | SetIsLoadingAction
    | SetErrorAction

