// npm i axios redux-thunk

const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FATCH_USERS_REQUEST = 'FATCH_USERS_REQUEST';
const FATCH_USERS_SUCCESS = 'FATCH_USERS_SUCCESS';
const FATCH_USERS_FAILURE = 'FATCH_USERS_FAILURE';

const fetchUserRequest = () => {
    return {
        type: FATCH_USERS_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FATCH_USERS_SUCCESS,
        payload: users,
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FATCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FATCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FATCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }

        case FATCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUser = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                //res.data
                const users = res.data.map(user => {return(user.id)})
                dispatch(fetchUserSuccess(users))
            }).catch(error => {
                //error.message
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {console.log(store.getState())});

store.dispatch(fetchUser());