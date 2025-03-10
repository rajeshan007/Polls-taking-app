function pollsReducer(state, action) {
    switch (action.type) {
        case 'ACTIVE_POLLS': {
            return { ...state, activePolls: action.payload }
        }

        default: {
            return { ...state }
        }
    }
}

export default pollsReducer