import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE,
} from '../actions/photos';

function photos(state={
}, action) {
    switch(action.type) {
    case FETCH_PHOTOS_REQUEST:
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: true,
            }
        });
    case FETCH_PHOTOS_SUCCESS:
        console.log('photo success');
        console.log(state, action.data.data.data);
        let b64encode = btoa(
            String.fromCharCode.apply(null, action.data.data.data)
        );
            b64encode = 'data:image/jpeg;base64,' + b64encode;
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: false,
                data: b64encode,
            }
        });
    case FETCH_PHOTOS_FAILURE:
        return Object.assign({}, state, {
            [action.query.photoId]: {
                isFetching: false,
            }
        });
    default:
        return state;
    }
}

export default photos;
