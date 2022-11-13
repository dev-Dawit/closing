/*
the general flow
1: useEffect is called on mount with the user from authentication handler(firebase feature)
2: if it is a sign-in user firebase authenticates and send access token to firestore
3: firestore gives back the users documents
4: userContext creates(stores) the properties & their values(i.e currentUser: null)
5: useEffect calls setCurrentUser method
6: setCurrentUser calles dispatch function giving it the user as arg
7: dispatch function passes the type and payload to action object of userReducer
8: payload has the value(object) that currentUser property will be changed to
9: the type arg from the dispatch finds a match from the types in userReducer('SET_CURRENT_USER')
10:currentUser is updated(set) to the payload value(w/c is the user object)
11:React rerenders the page accoriding to that user's view  
*/



import { createContext, useReducer, useEffect } from 'react';

import { onAuthStateChangedListner, createUserDocumetFromAuth } from '../utils/firebase/firebase.utils';

//the store where the actual value we want to access from different components, is kept
export const UserContext = createContext(
    {   // set the context object value to null when the app is run then it will be updated by values from firestore
    currentUser: null,            
    setCurrentUser: () => null
    }
) 

/*Reducers 
Reducer really shines in cases where 1 update, updates multiple readable values in the state   
Reducer is just a function that returns an object. reducers change the properties and values inside the object based on the action passed as arg
Reducer functions can also take current state value to derive(ex increment) the next state value, as Reducers modify state values
Reducer has kind of similar purpose as useState hook, they both are used to store context(states & state setter methods) to the 'value' var
Reducer has 2 parts, the part where we create action creators and the part w/c sets the the state based on the actions created
Reducer functions always return a new object, and React rerenders when it find new state 
*/


//containerizing (collecting) action types in an object, action obj has 2 properties type & payload
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

//the Reducer part w/c sets the state
const userReducer = (state, action) => {      //userReducer function returns an object.
    console.log('dispatched');
    console.log(action);
    const {type, payload} = action;           //action arg has two properties , type(description of what action we want to perform) & payload is the modified state value 

    switch(type) {                           
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {                   //we are returning a new object(context), we need to have all the properties of the state that we dont modify spread through and modify the properties of the state we want to modify
                ...state,
                currentUser: payload
            }
        default: 
            throw new Error(`Unhandled type ${type} in userReducer`)
    } 
}

//defining the initial state value, initial values are important b/c react renders/rerenders when if finds new state or new prop
//setting initial state value to null makes it clear to React when we then change the state value to some other value, the state is indeed changed  
const INITIAL_STATE = {
    currentUser: null
}


export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);  //the initial value of the state is 'null'
    
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);       //state arg manages the states properties & dispatch arg manages the method that modifies the state properties(the setter in this case)
    const { currentUser } = state          //the state holds the state(with all its properties), here we are destructuring currentUser property
  
    //action creator part of the Reducer  
    const setCurrentUser = (user) => {     //user is a value(null or auth object from firebase)
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});   //dispatch is a function w/c takes an action(w/c has the type & payload) object and pass it to the Reducer function 
    }

    
    //storing the user context(currentUser & setCurrentUser) to 'value' var
    const value = { currentUser, setCurrentUser };        

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => //onStateChanged could return 2 values of user, user if a user is signed in or null if signout
        { 
            if(user)
                createUserDocumetFromAuth(user);   //if a user is already signin get back userDocRef from fireStore, if it is new user create new docRef
            setCurrentUser(user)    //storing the user in the context in order to keep track
        });   
        
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>   // for every context there is a provider.i.e for userContext there is userContext.provider
}

//the provider is allowing any of its children component to access the value inside of its useState