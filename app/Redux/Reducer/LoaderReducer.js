import {
    LOADER_SHOW,
    LOADER_HIDE,
} from '../../Constants/ActionConstants';

const INITIAL_STATE = {
    isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
    const { type } = action;
    switch (type) {
        case LOADER_SHOW:
            return {
                ...state,
                isLoading: true,
            };
        case LOADER_HIDE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
