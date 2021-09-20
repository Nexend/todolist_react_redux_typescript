import { AuthActionCreators } from "./auth/action-creators";
import { TodoActionCreators } from "./todo/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...TodoActionCreators
}