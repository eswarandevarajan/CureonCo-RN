import {
    LOADER_SHOW,
    LOADER_HIDE,
} from '../../Constants/ActionConstants';

export function showLoader() {
    return {
        type: LOADER_SHOW,
    }
}

export function hideLoader() {
    return {
        type: LOADER_HIDE,
    }
}
