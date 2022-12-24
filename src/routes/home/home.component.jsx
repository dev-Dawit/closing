import { Outlet } from 'react-router-dom'; // outlet tells the specific position where the children routes should appear

import Directory from '../../components/directory/directory.component';

const Home = () => {
    return (
        <div>
            <Directory /> 
        </div>
    ) 
  }
  
  export default Home;