import {
    DELETE_PHOTO,
    FETCH_PHOTOS_FAILURE,
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    SAVE_PHOTO_SUCCESS,
} from '../actions/photos';

var Buffer = require('buffer').Buffer;

function photos(state={
}, action) {
    switch(action.type) {
    case FETCH_PHOTOS_REQUEST:
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: true,
            },
        });
    case FETCH_PHOTOS_SUCCESS:{
        let b64encode = new Buffer(action.data.data.data, 'binary')
        .toString('base64');
        b64encode = 'data:image/jpeg;base64,' + b64encode;
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: false,
                data: b64encode,
            },
        });
    }
    case FETCH_PHOTOS_FAILURE:
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: false,
            },
        });
    case SAVE_PHOTO_SUCCESS:
        return Object.assign({}, state, {
            [action.data.photoId]: {
                data: 'data:image/jpeg;base64,' + action.query.photo.data,
            },
        });
    case DELETE_PHOTO:
        return Object.assign({}, state, {
            [action.query.photoId]: undefined,
        });
    default:
        return state;
    }
}

export default photos;
