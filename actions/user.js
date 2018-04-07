export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';
export const EDIT_INFO_REQUEST = 'EDIT_INFO_REQUEST';
export const EDIT_INFO_SUCCESS = 'EDIT_INFO_SUCCESS';
export const EDIT_INFO_FAILURE = 'EDIT_INFO_FAILURE';

const GLOBAL = require('./../Globals');

function requestPhotos(query) {
    return { type: FETCH_PHOTOS_REQUEST, query };
}

function requestEditInfo(query) {
    return { type: EDIT_INFO_REQUEST, query };
}

function requestPhotosSuccess(query, data) {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        data: data,
    };
}

function editInfoSuccess(query, data) {
    return {
        type: EDIT_INFO_SUCCESS,
        data: data.profile,
    };
}

function requestPhotosFailure(error) {
    return {
        type: FETCH_PHOTOS_FAILURE,
        message: error.message,
    };
}

function editInfoFailure(error) {
    return {
        type: EDIT_INFO_FAILURE,
        message: error.message,
    };
}

function fetchPhoto(query) {
    return function (dispatch) {
        dispatch(requestPhotos(query));
        return fetch(GLOBAL.BASE_URL + '/user/photo/' + query.photoId)
        .then((response) => response.json(),
            error => dispatch(requestPhotosFailure(error))
        ).then((data) => {
            dispatch(requestPhotosSuccess(query, data));
        });
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

function shouldFetchPhoto(state) {
    if(state.user.isFetchingPhoto) {
        return false;
    } else {
        return !state.user.photoData;
    }
}

function shouldEditInfo(state) {
    if(state.user.isFetching) {
        return false;
    } else {
        return true;
    }
}

export function fetchPhotoIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldFetchPhoto(getState(), query)){
            return dispatch(fetchPhoto(query));
        } else {
            return Promise.resolve();
        }
    };
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
