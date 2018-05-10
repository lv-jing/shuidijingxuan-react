import {createStore,combineReducers,applyMiddleware,compose} from "redux";

import footerReducer from "../Reducers/footer";
import headerReducer from "../Reducers/header";
import reduxthunk from "redux-thunk";
import reduxpromise from "redux-promise";

var reducer = combineReducers({
	footerReducer,
	headerReducer
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxthunk,reduxpromise)
 ));

export default store;
