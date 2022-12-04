import produce from '../util/produce';

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    user: {
        isLoggedIn: false,
        id: '',
        name: '',
    }
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const loginRequestAction = (data: any) => ({
    type: LOG_IN_REQUEST,
    data,
});

const dummyUser = (data: any) => ({
    ...data,
    id: 1,
    name: '나상엽'
});

const reducer = (state = initialState, action: any) => {
    return produce(state, (draft: any) => {
        console.log('reducers action: ', action)
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.me = dummyUser(action.data);
                draft.logInDone = true;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            default:
                break;
        }
    })
}

export default reducer;