import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListner, createUserDocumetFromAuth } from '../utils/firebase/firebase.utils';

//the store where the actual value we want to access from different components, is kept
export const UserContext = createContext(
    {   // set the context object value to null
    currentUser: null,            
    setCurrentUser: () => null
    }
) 


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);  //the initial value of the state is 'null'
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => //onStateChanged could respond 2 values of user, user if a user is signed in or null if signout
        { 
            if(user)
                createUserDocumetFromAuth(user);   //if a user is already signin get back userDocRef from fireStore, if it is new user create new docRef
            setCurrentUser(user)    //storing the user in the context in order to keep track
        });   
        
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>   // for every context there is a provider. like for userContext there is userContext.provider
}

//the provider is allowing any of its children component to access the value inside of its useState