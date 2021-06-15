import { combineReducers } from 'redux';
import {userReducer} from './users/ducks';
import { notificationsReducer } from './notifications/ducks';
import {authorsReducer} from './authors/ducks';
import {booksReducer} from './books/ducks';
const rootReducer = combineReducers({

    users: userReducer,
    notifications: notificationsReducer,
    authors:authorsReducer,
    books:booksReducer
});

export default rootReducer;