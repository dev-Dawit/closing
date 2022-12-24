import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { onAuthStateChangedListner, createUserDocumetFromAuth } from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication-page/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => //onStateChanged could return 2 values of user, user if a user is signed in or null if signout
      { 
          if(user)
              createUserDocumetFromAuth(user);   //if a user is already signin get back userDocRef from fireStore, if it is new user create new docRef
          dispatch(setCurrentUser(user))    //storing the user in the context in order to keep track
      }
    );   
    return unsubscribe;
  },[])

  return (
    <Routes>
      <Route path='/' element={<Navigation  />} >      
        <Route index element={<Home />} />                    
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>                                 
    </Routes>
      
  );
}

export default App;
