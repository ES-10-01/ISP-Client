import { Dispatch } from "redux";

export function boundSetAuth(dispatch: Dispatch,
        username: string, password: string, isAdmin: boolean) {
    dispatch({
        'type': 'AUTH',
        username,
        password,
        isAdmin
    });
};
