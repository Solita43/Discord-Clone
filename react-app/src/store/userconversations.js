const GETUSERCONVERSATIONS = 'conversations/GET_CONVERSATIONS'


const getConversations = (data) => {
    return {
        type: GETUSERCONVERSATIONS,
        data
    }
}



export const getConversationsThunk = () => async (dispatch) => {
    const response = await fetch('/api/conversations')

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        }
        dispatch(getConversations(data))
    }
}




const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETUSERCONVERSATIONS:
            return { ...action.data }
        default:
            return state

    }
}
