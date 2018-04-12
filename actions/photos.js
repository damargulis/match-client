export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';
export const SAVE_PHOTO_REQUEST = 'SAVE_PHOTOS_REQUEST';
export const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTOS_SUCCESS';
export const DELETE_PHOTO = 'DELETE_PHOTO';

const GLOBAL = require('./../Globals');

function deletePhotoAction(query, data) {
    return { type: DELETE_PHOTO, query, data};
}

function requestPhotos(query) {
    return { type: FETCH_PHOTOS_REQUEST, query };
}

function requestSavePhotos(query) {
    return { type: SAVE_PHOTO_REQUEST, query };
}

function requestPhotosSuccess(query, data) {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        query,
        data,
    };
}

function savePhotoSuccess(query, data) {
    return {
        type: SAVE_PHOTO_SUCCESS,
        query,
        data,
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
            error => dispatch(requestPhotosFailure(error))
        ).then((data) => {
            dispatch(requestPhotosSuccess(query, data));
        });
    };
}

export function deletePhoto(query) {
    return function (dispatch) {
        return fetch(GLOBAL.BASE_URL
            + '/user/'
            + query.userId
            + '/photo/'
            + query.photoId, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(deletePhotoAction(query, data));
        });
    };
}

export function savePhoto(query) {
    return function (dispatch) {
        dispatch(requestSavePhotos(query));
        const data = new FormData();
        data.append('photo', {
            uri: query.photo.uri,
            type: 'image/png',
            name: 'testName',
        });
        return fetch(GLOBAL.BASE_URL + '/user/' + query.userId + '/photos', {
            method: 'POST',
            body: data,
        }).then((response) => response.json())
        .then((data) => {
            dispatch(savePhotoSuccess(query, data));
        });
    };
}

function shouldFetchPhoto(state, query) {
    const photo = state.photos[query.photoId];
    if(!photo) {
        return true;
    } else if(photo.isFetching) {
        return false;
    } else {
        return !photo.data;
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
