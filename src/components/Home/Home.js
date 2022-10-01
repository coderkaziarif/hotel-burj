import { Typography } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import Room from '../Room/Room';
// "react-router-dom": "^6.3.0",
const Home = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    console.log(loggedInUser);
    const style = {
        display: 'flex',
        margin: '20px',  
        justifyContent: 'space-between'
    }
    const rooms = [
        {
            title: 'Standard Single Room',
            description: 'Standard Single Rooms are designed in open -concept living area and have many facilities.',
            imgUrl: 'https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/offers/offer-images/burj-al-arab-presidential-suite-living-room-4-hero.jpg',
            bed: 1,
            capacity: 1,
            bedType: 'Single',
            avatar: 'S',
            price: 119
        },
        {
            title: 'Couple Power Room',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: 'https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/offers/offer-images/burj-al-arab-royal-suite-staircase-5-hero.jpg',
            bed: 1,
            capacity: 2,
            bedType: 'Double',
            avatar: 'D',
            price: 149
        },
        {
            title: 'Family Capacity Room',
            description: ' Have lots of in-room facilities and are designed in open-concept living area.',
            imgUrl: 'https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/hotels/dubai/burj-al-arab-jumeirah/room/presidential-two-bedroom-suite/burj-al-arab-presidential-suite-guest-bedroom_6-4_landscape/burj-al-arab-presidential-suite-guest-bedroom_16-9_landscape.jpg?w=2080',
            bed: 2,
            capacity: 4,
            bedType: 'Family',
            avatar: 'F',
            price: 199
        }
    ]
    return (
        <> 
            <Typography variant="h6" color="textSecondary" component="div">{loggedInUser.name ? `Welcome - ${loggedInUser.name }` : "Login please"}</Typography> 
       
            <div style={style}>
                {
                    rooms.map(room => <Room key={room.bedType} room={room}></Room>)
                }
            </div>
        </>
    );
};

export default Home;