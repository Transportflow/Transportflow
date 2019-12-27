export default function stop(state = [], action) {
    switch (action.type) {
        case 'SET_STOP':
            return action.stop;
        case 'CLEAR_STOP':
            return [];
        default:
            return state
    }
}