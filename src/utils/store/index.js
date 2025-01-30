import { configureStore } from '@reduxjs/toolkit';
import logReducer from './logSlice'
import registerReducer from './registerSlice';
import clientReducer from './clientSlice';
import countReducer from './countSlice'
import staffSlice from './staffSlice';
import roleSlice from './roleSlice';
import remarkSlice  from './remarkSlice';
import { combineReducers } from 'redux';
 const rootReducer = combineReducers({

    auth: logReducer ,
    // register : registerReducer,
    clients: clientReducer,
    count: countReducer,
    staff: staffSlice,
    role: roleSlice,
    remarks: remarkSlice,
 });

export default rootReducer;