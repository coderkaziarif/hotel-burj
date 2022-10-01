import React from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import {Outlet, Navigate, useLocation} from 'react-router-dom';

const ProtectRoute = () => {
   const location = useLocation();
   const [loggedInUser] = useContext(userContext);
   return (
      loggedInUser.name ? <Outlet/> : <Navigate to = {'/login'} replace state={{ from: location }}/>     
   )
};

export default ProtectRoute;