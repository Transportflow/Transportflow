export default function suggestions(state = [], action) {
    switch (action.type) {
        case 'SET_SUGGESTIONS':
            return action.suggestions;
        case 'CLEAR_SUGGESTIONS':
            return [];
        default:
            return state
    }
}