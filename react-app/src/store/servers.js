const GET_USER_SERVERS = "servers/GET_USER_SERVERS";
const GET_ALL_SERVERS = "servers/GET_ALL_SERVERS"
const GET_DETAILS = "servers/GET_DETAILS";
const POST_NEW_SERVER = "servers/POST_NEW_SERVER";
const EDIT_SERVER = "servers/EDIT_SERVER";
const DELETE_SERVER = "servers/DELETE_SERVER";
const ADD_SERVER_USER = "servers/ADD_USER"



const getUserServers = (serverList) => ({
    type: GET_USER_SERVERS,
    payload: serverList
})
const getAllServers = (data) => {
    return {
        type: GET_ALL_SERVERS,
        data

    }
}

const getDetails = (server) => ({
    type: GET_DETAILS,
    payload: server
})

const postServer = (newServer) => ({
    type: POST_NEW_SERVER,
    payload: newServer
})

const editServer = (updated) => ({
    type: EDIT_SERVER,
    payload: updated
})

const deleteServer = (serverId) => ({
    type: DELETE_SERVER,
    payload: serverId
})


export const userServersGet = (userId) => async (dispatch) => {
    const res = await fetch(`/api/servers/users`)

    const data = await res.json();
    if (res.ok) {
        dispatch(getUserServers(data));
        return null;
    } else {
        return data;
    }
}
export const getServersThunk = () => async dispatch => {
    const res = await fetch(`/api/servers/`)
    const data = await res.json()
    if (res.ok) {
        dispatch(getAllServers(data))
    }
    else {
        return data
    }
}
export const addServerUserThunk = (id, body) => async dispatch => {
    const res = await fetch(`/api/servers/${id}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.ok) {
        return data
    }
    else {
        return data.errors
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

export const serverPost = (formData) => async (dispatch) => {
    console.log("in the server store form Data: ". formData)
    const res = await fetch("/api/servers/", {
        method: "POST",
        body: formData
    })

    const data = await res.json();
    console.log("data", data)

    if (res.ok) {
        dispatch(postServer(data))
        return data
    } else {
        return {error: data.name[0]}
    }
}

export const serverEdit = (updated, serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(editServer(data))
        return null
    } else {
        return data
    }
}

export const channelEdit = (channelId, body) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    const data = await res.json();
    if (res.ok) {
        return null;
    } else {
        return data;
    }
}

export const deleteChannel = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    })

    const data = await res.json();
    if (res.ok) {
        return null;
    } else {
        return data;
    }
}

export const serverDelete = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(deleteServer(serverId))
        return data
    } else {
        return data
    }
}

export const createChannel = (body) => async (dispatch) => {
    const res = await fetch('/api/channels/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    if (res.ok) {
        return data
    } else {
        return data;
    }
}

export const createChannelGroupThunk = (data) => async (dispatch) => {
    const res = await fetch(`/api/channelGroups/${data.serverId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    const errors = await res.json();

    if (res.ok) {
        return null;
    } else {
        return errors;
    }
}



const initialState = {
    AllServers: {},
    ServerList: {},
    ServerDetails: {}
}

export default function reducer(state = initialState, action) {
    const newState = { ...state, ServerList: { ...state.ServerList }, AllServers: { ...state.AllServers }, ServerDetails: { ...state.ServerDetails } };
    switch (action.type) {
        case GET_USER_SERVERS:
            newState.AllServers = { ...action.payload.Servers };
            return newState;
        case GET_ALL_SERVERS:
            let serverArr = action.data.servers
            for (let server of serverArr) {

                newState.ServerList[server.id] = server
            }
            return newState
        case GET_DETAILS:
            newState.ServerDetails = { ...newState.ServerDetails, ...action.payload };
            return newState;
        case POST_NEW_SERVER:
            newState.AllServers[action.payload.id] = { ...action.payload };
            newState.AllServers = { ...newState.AllServers }
            return newState;
        case EDIT_SERVER:
            newState.AllServers = { ...newState.AllServers, [action.payload.id]: { ...action.payload } }
            return newState
        case DELETE_SERVER:
            delete newState.AllServers[action.payload]
            return newState
        // case POST_NEW_GROUP:
        //     let server = action.data.server_id
        //     let groupName = action.data.name
        //     newState.ServerDetails[server].channels = { ...newState.serverDetails[server].channels, groupName: action.data}
        default:
            return state;
    }
}
