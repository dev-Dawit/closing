//key differenct b/n redux and context is that in redux all the reducers can listen and react to every action
//in case of context, for example the userContext uses useReducer(w/c accepts userReducer & initial state) and returns a dispatch, this dispatch when called will only fire actions to the associated Reducer  
//so in redux reducers may not respond to actions that the type that does not match to their type, meaning all the cases doesnt switch and the default case will return back the current/previous state

import  {USER_ACTION_TYPES}  from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE , action) => {      //b/c we dont have useReducer hook, w/c we used to initialize the initial state, we have to manually initialize the initial state value
    console.log('dispatched');
    console.log(action);
    const {type, payload} = action;           

    switch(type) {                           
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {                  
                ...state,
                currentUser: payload
            }
        default: 
            return state;             //return current/previous state
            
    } 
}