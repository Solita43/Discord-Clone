const GET_ALL_USERS = "users/GET_ALL_USERS"


const getUsers = (data) => ({
    type: GET_ALL_USERS,
    data
})

export const getAllUsersThunk = () => async (dispatch) => {
    console.log("We are in the users thunk!! ")
    let res = await fetch('/api/users/')
    const data = await res.json();
    if (res.ok) {


        dispatch(getUsers(data));
    } else {
        return data;
    }
}

const initialState = {
    allUsers: {}
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS: {
            let users = {}
            action.data.users.forEach(user => {
                users[user.userId] = user
            })
            return { ...state, allUsers: { ...users } }
        }
        default:
            return state
    }
}
