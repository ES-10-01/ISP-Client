const INITIAL_STATE = {
    isAuth: false,
    username: '',
    password: '',
    isAdmin: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'AUTH':
            return {
                ...state,
                isAuth: true,
                username: action.username,
                password: action.password,
                isAdmin: action.isAdmin,
            };
        default:
            return state;
    }
};

export default reducer;
