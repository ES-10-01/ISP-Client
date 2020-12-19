import { Dispatch } from "redux";

export function boundSetAuth(dispatch: Dispatch,
        userUid: number, password: string, isAdmin: boolean) {
    dispatch({
        type: 'AUTH',
        userUid,
        password,
        isAdmin
    });
};

export function boundSetNoAuth(dispatch: Dispatch) {
    dispatch({
        type: 'NOAUTH'
    });
}
