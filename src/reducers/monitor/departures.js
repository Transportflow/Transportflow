export default function departures(state = [], action) {
    switch (action.type) {
        case 'SET_DEPARTURES':
            return action.departures;
        case 'CLEAR_DEPARTURES':
            return [];
        default:
            return state
    }
}