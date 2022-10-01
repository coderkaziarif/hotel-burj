import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const {bedType} = useParams();
    const[loggedInUser, setLoggedInUser] = useContext(userContext);
    const [selectDate, setSelectDate] = useState({
        checkIn : new Date(),
        checkOut : new Date()
    });
    
      const handleCheckIn = (date) => {
        const newDates = {...selectDate};
        newDates.checkIn = date;
        setSelectDate(newDates);
      };

      const handleCheckOut = (date) => {
        const newDates = {...selectDate};
        newDates.checkOut = date;
        setSelectDate(newDates);
      };

      const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectDate};
        fetch('http://localhost:2233/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            if(result){
              alert('Bookings successfully')
            }
        })
        
        
      };


    return (
        
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Stack spacing={3}>
                    <DesktopDatePicker
                    label="Check In Date"
                    inputFormat="MM/DD/YYYY"
                    value={selectDate.checkIn}
                    onChange={handleCheckIn}
                    renderInput={(params) => <TextField {...params} />}
                    />
            
                    <DesktopDatePicker
                    label="Check Out Date"
                    value={selectDate.checkOut}
                    onChange={handleCheckOut}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider><br />
            <Button onClick={handleBooking} variant="contained">Book Now</Button> <br />
            <Bookings/>
        </div>
        
    );
};

export default Book;