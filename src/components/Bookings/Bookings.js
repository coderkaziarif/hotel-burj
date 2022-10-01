import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
   const [bookings, setBookings] = useState([]);
   const [loggedInUser,setLoggedInUser] = useContext(userContext);

   useEffect(()=>{
      fetch('http://localhost:2233/bookings?email=' +loggedInUser.email, {
         method:'GET',
         headers:{
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-type': 'application/json'

            }
      })
      .then(res => res.json())
      .then (data => setBookings(data))
   }, [loggedInUser.email])

   return (
      <div>
         <h3>You have: {bookings.length} bookings.</h3>
         {
            bookings.map(book => <Alert variant="outlined" severity="info" sx={{mb:2}}> {book.name} from: {(new Date(book.checkIn).toDateString('dd/mm/yyyy'))} to: {(new Date(book.checkOut).toDateString('dd/mm/yyyy'))} </Alert> )
         }
      </div>
   );
};

export default Bookings;