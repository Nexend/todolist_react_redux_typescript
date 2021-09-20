import axios from "axios";
import { AppDispatch } from "../..";
import { IData, IUser } from "../../../models/IUser";
import { deleteCookie, getCookie, setCookie } from "../../../utils/cookies";
import { TodoActionCreators } from "../todo/action-creators";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetIsSuccessAction, SetUserAction } from "./types";

const baseUrl = 'https://api-nodejs-todolist.herokuapp.com/user';

const authorization = {
    Authorization: `Bearer ${getCookie('token')}`
}

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setIsSuccess: (payload: boolean): SetIsSuccessAction => ({ type: AuthActionEnum.SET_IS_SUCCESS, payload }),
    setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),

    getCurrentUser: () => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<IUser>(`${baseUrl}/me`, {
                headers: {
                    ...authorization
                }
            });
            if (response.status === 200) {
                dispatch(AuthActionCreators.setUser(response.data));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка в авторизации'));
        }
    },

    registration: (data: IUser) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await axios.post<IData>(`${baseUrl}/register`, data);
            if (response.status === 201) {
                dispatch(AuthActionCreators.setIsSuccess(true));
                setTimeout(() => {
                    dispatch(AuthActionCreators.setIsSuccess(false));
                }, 4000)
            } else {
                dispatch(AuthActionCreators.setIsSuccess(false));
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e: any) {
            if (e.response.status >= '404') {
                dispatch(AuthActionCreators.setError('Произошла какая-то ошибка'));
            } else {
                dispatch(AuthActionCreators.setError('Пользователь с таким Email уже существует'));
                setTimeout(() => {
                    dispatch(AuthActionCreators.setError(''));
                }, 4000)
            }

        }
    },

    login: (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await axios.post<IData>(`${baseUrl}/login`, { email, password });
            if (response.status === 200) {
                setCookie('token', `${response.data.token}`);
                dispatch(AuthActionCreators.setUser(response.data.user));
                dispatch(AuthActionCreators.setIsAuth(true));
            }
            dispatch(AuthActionCreators.setIsLoading(false));

        } catch (e) {
            dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        deleteCookie('token');
        dispatch(AuthActionCreators.setError(''));
        dispatch(AuthActionCreators.setIsAuth(false));
        dispatch(TodoActionCreators.getTodo([]));
    }
}