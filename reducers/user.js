import {
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../actions/auth';
import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE,
} from '../actions/user';


function user(state = {
    isFetching: false,
}, action) {
    console.log('user reducer');
    console.log(state, action);
    switch(action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case CREATE_ACCOUNT_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            profile: action.user,
        });
    case CREATE_ACCOUNT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            profile: action.user,
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
        });
    case CREATE_ACCOUNT_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
        });
    case LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            profile: undefined,
        });
    case FETCH_PHOTOS_REQUEST:
        return Object.assign({}, state, {
            isFetchingPhoto: true,
            profile: Object.assign({}, state.profile, {
                photoData: undefined,
            })
        })
    case FETCH_PHOTOS_SUCCESS:
        console.log('fetch photos success');
        console.log(action);
        
        var b64encode = btoa(
            String.fromCharCode.apply(null, action.data.data.data)
        );
        console.log(b64encode);
        b64encode = 'data:image/jpeg;base64,' + b64encode;
        return Object.assign({}, state, {
            isFetchingPhoto: false,
            profile: Object.assign({}, state.profile, {
                photoData: b64encode
            }),
        });
    case FETCH_PHOTOS_FAILURE:
        return Object.assign({}, state, {
            isFetchingPhoto: false,
            photoData: Object.assign({}, state.profile, {
                photoData: undefined,
            }),
        });
    default:
        return state;
    }
}

export default user;
