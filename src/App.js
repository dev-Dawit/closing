import {Routes, Route} from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication-page/authentication.component';

const Shop = () => {
  return(
    <div>
      <h2>This is the Shop page</h2>
    </div>
  )
}

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Navigation  />} >      
        <Route index element={<Home />} />                    
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>                                 
    </Routes>
      
  );
}

export default App;
