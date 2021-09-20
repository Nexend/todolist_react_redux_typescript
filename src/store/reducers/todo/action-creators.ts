import axios from "axios";
import { AppDispatch } from "../..";
import { ITodo, ITodoListRequest, ITodoRequest } from "../../../models/ITodo";
import { GetTodoAction, SetIsLoadingAction, SetErrorAction, TodoActionEnum, AddTodoAction, DeleteTodoAction, UpdateTodoAction } from "./types";

const baseUrl = 'https://api-nodejs-todolist.herokuapp.com/task';

export const TodoActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: TodoActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: TodoActionEnum.SET_ERROR, payload }),
    getTodo: (payload: ITodo[]): GetTodoAction => ({ type: TodoActionEnum.GET_TODO, payload }),
    addTodo: (payload: ITodo): AddTodoAction => ({ type: TodoActionEnum.ADD_TODO, payload }),
    updTodo: (payload: ITodo): UpdateTodoAction => ({ type: TodoActionEnum.UPDATE_TODO, payload }),
    delTodo: (payload: string): DeleteTodoAction => ({ type: TodoActionEnum.DELETE_TODO, payload }),

    getTodoList: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(TodoActionCreators.setIsLoading(true));
            const response = await axios.get<ITodoListRequest>(baseUrl, {
                headers: {
                    "Authorization": token
                }
            });
            if (response.status === 200) {
                dispatch(TodoActionCreators.getTodo(response.data.data))
            }
            dispatch(TodoActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(TodoActionCreators.setError('Упс! Что-то пошло не так'));
        }
    },

    createTodo: (taskDescr: string, loading: Function, token: string) => async (dispatch: AppDispatch) => {
        try {
            loading(true);
            const response = await axios.post<ITodoRequest>(baseUrl, { description: taskDescr }, {
                headers: {
                    "Authorization": token
                }
            });
            if (response.status === 201) {
                dispatch(TodoActionCreators.addTodo(response.data.data));
            }
            loading(false);

        } catch (e) {
            dispatch(TodoActionCreators.setError('При создании таски произошла ошибка'));
        }
    },

    updateTodo: (taskId: string, choosenTask: boolean, token: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.put<ITodoRequest>(`${baseUrl}/${taskId}`, { completed: choosenTask }, {
                headers: {
                    "Authorization": token
                }
            });
            if (response.status === 200) {
                dispatch(TodoActionCreators.updTodo(response.data.data));
            }
        } catch (e) {
            dispatch(TodoActionCreators.setError('Что-то пошло не так'));
        }
    },

    deleteTodo: (taskId: string, token: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete<ITodoRequest>(`${baseUrl}/${taskId}`, {
                headers: {
                    "Authorization": token
                }
            });
            if (response.status === 200) {
                dispatch(TodoActionCreators.delTodo(taskId));
            }
        } catch (e) {
            dispatch(TodoActionCreators.setError('При удалении произошла ошибка'));
        }
    }
}