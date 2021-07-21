// npm init --yes
//npm i redux
//npm i redux-logger

// console.log('Jeet Desai')

//1.redux, reducer
//2.combineReducer
//3.applyMiddleware
const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore
const combineReduce = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICESCREAM = 'BUY_ICESCREAM';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICESCREAM,
        info: 'Second Redux Action'
    }
}
//(prevState, action) => newState
// const initialState = {
//     numOfCake: 10,
//     numOfIceScreams: 20,
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numOfCake: state.numOfCake - 1
//         }
//         case BUY_ICESCREAM: return {
//             ...state,
//             numOfIceScreams: state.numOfIceScreams - 1
//         }
//         default: return state
//     }
// }

const initCakeState = {
    numOfCake: 10
}
const initIceCreamState = {
    numOfIceScreams: 20
}

const cakeReducer = (state = initCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCake: state.numOfCake - 1
        }
        default: return state
    }
}

const iceCreamRreducer = (state = initIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICESCREAM: return {
            ...state,
            numOfIceScreams: state.numOfIceScreams - 1
        }
        default: return state
    }
}

const rootReducer = combineReduce({
        cake: cakeReducer,
        iceCream : iceCreamRreducer
})

// const store = createStore(reducer)
// const store = createStore(rootReducer)
const store = createStore(rootReducer, applyMiddleware(logger))

console.log('init', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()