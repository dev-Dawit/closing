import { createContext, useState } from 'react';


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


    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>   // for every context there is a provider. like for userContext there is userContext.provider
}

//the provider is allowing any of its children component to access the value inside of its useState