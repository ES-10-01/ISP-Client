import { createUserCreds } from "./UserCreds";

const INITIAL_STATE = {
    isAuth: false,
    creds: createUserCreds(0, ''),
    isAdmin: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'AUTH':
            return {
                ...state,
                isAuth: true,
                creds: createUserCreds(action.userUid, action.password),
                isAdmin: action.isAdmin,
            };
        case 'NOAUTH':
            return {
                ...state,
                isAuth: false,
                creds: createUserCreds(0, ''),
                isAdmin: false
            };
        default:
            return state;
    }
};

export default reducer;
