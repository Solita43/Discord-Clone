const UPDATE_USER = "status/UPDATE_USER"
const GET_USERS_STATUS_LIST = "status/GET_USERS_STATUS_LIST"



const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
})

const usersStatus = (users) => ({
    type: GET_USERS_STATUS_LIST,
    payload: users
})



export const userOnlineStatusUpdate = (user) => async (dispatch) => {
    console.log(user)
    dispatch(updateUser(user))
    return null;
}

export const getUsersOnlineStatus = () => async (dispatch) => {
    const res = await fetch('/api/onlineStatus/')
    const data = await res.json();

    if (res.ok) {
        dispatch(usersStatus(data));
        return null;
    } else {
        return data;
    }
}



const initialState = {
    UserStatus: {}
}

export default function reducer(state = initialState, action) {
    const newState = { ...state, UserStatus: { ...state.UserStatus } }
    switch (action.type) {
        case UPDATE_USER:
            /*
                expected: [<userId>, "status"]
            */
            console.log(action.payload)
            newState.UserStatus[action.payload[0]] = action.payload[1];
            return newState;
        case GET_USERS_STATUS_LIST:
            /*
                expected: {
                    <userId>: "status",
                    <userId>: "status"
                }
            */
            newState.UserStatus = { ...action.payload }
            return newState;
        default:
            return state;
    }
}
