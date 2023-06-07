const GET_USER_SERVERS = "servers/GET_USER_SERVERS";
const GET_DETAILS = "servers/GET_DETAILS"
const POST_NEW_SERVER = "servers/POST_NEW_SERVER"


const getUserServers = (serverList) => ({
    type: GET_USER_SERVERS,
    payload: serverList
})

const getDetails = (server) => ({
    type: GET_DETAILS,
    payload: server
})

const postServer = (newServer) => ({
    type: POST_NEW_SERVER,
    payload: newServer
})


export const userServersGet = (userId) => async (dispatch) => {
    const res = await fetch(`/api/servers/users`)
    console.log(res.body)
    const data = await res.json();
    if (res.ok) {
        dispatch(getUserServers(data));
        return null;
    } else {
        return data;
    }
}

export const serverDetailsGet = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getDetails(data));
        return null
    } else {
        return data;
    }

}

export const serverPost = (server) => async (dispatch) => {
    const res = await fetch("/api/servers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(server)
    })

    const data = await res.json();

    console.log(data)

    if (res.ok) {
        dispatch(postServer(data))
        return data
    } else {
        return data
    }
}





const initialState = {
    AllServers: {},
    ServerDetails: {}
}

export default function reducer(state = initialState, action) {
    const newState = { ...state, AllServers: { ...state.AllServers }, ServerDetails: { ...state.ServerDetails } };
    switch (action.type) {
        case GET_USER_SERVERS:
            newState.AllServers = { ...action.payload.Servers };
            return newState;
        case GET_DETAILS:
            newState.ServerDetails = { ...newState.ServerDetails, ...action.payload };
            return newState;
        case POST_NEW_SERVER:
            newState.AllServers[action.payload.id] = { ...action.payload };
            newState.AllServers = { ...newState.AllServers }
            return newState;
        default:
            return state;
    }
}
