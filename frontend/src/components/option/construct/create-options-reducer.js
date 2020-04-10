const optionsLimit = 5;

export const optionReducer = (state, action) => {
    switch (action.type) {
        case "ADD_OPTION":
            return state.data.length === optionsLimit ? {...state} : {
                ...state,
                data: state.data.concat([{id: state.data.length + 1, name: ""}]),
                isFull: state.data.length + 1 === optionsLimit
            };
        case "REMOVE_OPTION": {
            if (state.data.length === 0) return {...state};
            let newOptions = state.data.filter(option => action.payload.id !== option.id);
            newOptions = newOptions.map((option, inx) => ({...option, id: inx + 1}));
            return {
                ...state,
                data: newOptions,
                isFull: newOptions.length === optionsLimit
            };
        }
        case "CHANGE_VALUE": {
            const newOptions = state.data.map((option) => {
                if (option.id !== action.payload.id) return option;
                return {...option, value: action.payload.value};
            });
            return {
                ...state,
                data: newOptions
            };
        }
        default:
            throw new Error();
    }
};