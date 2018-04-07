
export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

const GLOBAL = require('./../Globals');

function requestPhotos(query) {
    return { type: FETCH_PHOTOS_REQUEST, query };
}

function requestPhotosSuccess(query, data) {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        data: data,
    };
}

function requestPhotosFailure(error) {
    return {
        type: FETCH_PHOTOS_FAILURE,
        message: error.message,
    };
}

function fetchPhoto(query) {
    return function (dispatch) {
        dispatch(requestPhotos(query));
        return fetch(GLOBAL.BASE_URL + '/user/photo/' + query.photoId)
        .then((response) => response.json(),
            error => requestPhotosFailure(error)
        ).then((data) => {
            dispatch(requestPhotosSuccess(query, data));
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

export function fetchPhotoIfNeeded(query) {
    return (dispatch, getState) => {
        if(shouldFetchPhoto(getState(), query)){
            return dispatch(fetchPhoto(query));
        } else {
            return Promise.resolve();
        }
    };
}
