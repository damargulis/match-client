export const EDIT_INFO_REQUEST = 'EDIT_INFO_REQUEST';
export const EDIT_INFO_SUCCESS = 'EDIT_INFO_SUCCESS';
export const EDIT_INFO_FAILURE = 'EDIT_INFO_FAILURE';

const GLOBAL = require('./../Globals');

function requestEditInfo(query) {
    return { type: EDIT_INFO_REQUEST, query };
}

function editInfoSuccess(query, data) {
    return {
        type: EDIT_INFO_SUCCESS,
        data: data.profile,
    };
}

function editInfoFailure(error) {
    return {
        type: EDIT_INFO_FAILURE,
        message: error.message,
    };
}

function editInfo(query) {
    return function (dispatch) {
        dispatch(requestEditInfo(query));
        return fetch(GLOBAL.BASE_URL + '/user/' + query._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: query,
            }),
        }).then((response) => response.json(),
            error => dispatch(editInfoFailure(error))
        ).then((response) => {
            if(response.success) {
                dispatch(editInfoSuccess(query, response));
            } else {
                dispatch(editInfoFailure(response));
            }
        });
    };
}

function shouldEditInfo(state) {
    if(state.user.isFetching) {
        return false;
    } else {
        return true;
    }
}

export function editInfoIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldEditInfo(getState(), query)){
            return dispatch(editInfo(query));
        } else {
            return Promise.resolve();
        }
    };
}
