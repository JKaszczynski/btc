export const optionReducer = (state, action) => {
    switch (action.type) {
        case 'OPTIONS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'OPTIONS_FETCH_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case 'OPTIONS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};