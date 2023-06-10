const GET_VOICE_CHANNELS_BY_SERVER_ID = "voicechannels/GET_THEM_VOICE_CHANNELS"




const getVoiceChannelsByServer = (data) => ({
    type: GET_VOICE_CHANNELS_BY_SERVER_ID, 
    payload: data
})

export const getVoiceChannelsByServerId = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/voiceChannels/${serverId}`); 
    const data = await res.json(); 
    if (res.ok) {
        dispatch(getVoiceChannelsByServer(data))
        return null; 
    } else {
        return data; 
    }
}



const initialState = {}

export default function reducer (state = initialState, action) {
    const newState = {...state}; 
    switch (action.type) {
        case GET_VOICE_CHANNELS_BY_SERVER_ID: 
            return {...action.payload}; 
        default: 
            return state; 
    }
}
