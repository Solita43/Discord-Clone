const GET_USER_SERVERS = "servers/GET_USER_SERVERS";


const getUserServers = (serverList) => ({
    type: GET_USER_SERVERS,
    payload: serverList
})

export const userServersGet = (userId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${userId}`)
    // console.log(res.body)
    const data = await res.json();
    if (res.ok) {
        dispatch(getUserServers(data));
        return null;
    } else {
        return data;
    }
}



const initialState = {
    AllServers: {}
}

export default function reducer(state = initialState, action) {
    const newState = { ...state, AllServers: { ...state.AllServers } };
    switch (action.type) {
        case GET_USER_SERVERS:
            newState.AllServers = { ...action.payload.Servers }
            return newState;
        default:
            return state;
    }
}
