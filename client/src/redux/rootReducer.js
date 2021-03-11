import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import categoryReducer from './category/categoryReducer'



const rootReducer=combineReducers({
    auth: authReducer,
    cat: categoryReducer
})


export default rootReducer