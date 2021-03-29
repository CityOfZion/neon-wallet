var GET_SETTINGS = 'GET_SETTINGS';
export default (function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case GET_SETTINGS:
            return Object.assign({}, state, {});
        default:
            return state;
    }
});
