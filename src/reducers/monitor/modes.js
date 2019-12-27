export default function modes(state = [], action) {
    switch (action.type) {
        case 'SET_MODES':
            return action.modes;
        case 'CLEAR_MODES':
            return [];
        default:
            return state
    }
}