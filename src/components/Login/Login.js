import React, { useContext } from 'react';
import  {initializeApp}  from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { userContext } from '../../App';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@material-ui/core';
import { Alert } from '@mui/material';


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// let firebase;

const Login = () => {
    const auth = getAuth(app);
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    // console.log(user.error);

    // Redirect to Previous Page//
    const navigate = useNavigate();
    const location = useLocation();
    let {from} = location.state || {from: {pathname: '/'}};
    // const { from } = location.state || {};
    // ------------X--------------//
  
    const handleBlur = (e)=> {
        let isFieldValid = true
        if(e.target.name === 'email'){
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFieldValid = isEmailValid;
            // console.log("Email",isEmailValid); 
        }

        if(e.target.name === 'password'){
            const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value);
            isFieldValid = isPasswordValid;
            // console.log("password",isPasswordValid);
        }

        if(isFieldValid){
            const newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    const handleSubmit = (e)=> {
        // console.log(user.email, user.password);
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                const newUserInfo = {...user};
                newUserInfo.error= "";
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
               
          
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                // const errorMessage = error.message;
                // console.log(errorMessage);

            });

        }

        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const user = res.user;
                    const newUserInfo = {...user};
                    newUserInfo.error= "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const {displayName, email} = res.user;
                    const signedInUser = {name:displayName, email};
                    setLoggedInUser(signedInUser);
                    storeAuthToken();
                    // Redirect to Previous Page//
                    setTimeout(() => {
                        navigate(from)
                        // navigate(from.pathname || "/", { replace: true });
                    }, 3000)
                   
                    // console.log("sign In User info", res.user);
                })
                .catch((error) => {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // console.log(error.message);
                });

        }
        
        e.preventDefault();

    }

    const updateUserName = (name)=> {
        updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            console.log("User Name Updated Successfully");
          }).catch((error) => {
            console.log(error);
          });
    }

    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
           sessionStorage.setItem('token', idToken)
          }).catch(function(error) {
            // Handle error
          });
    }



    return (
        <div style={{textAlign:"center"}}>
            <h1>User Login Authentication</h1>
            <p>Email : {user.email}</p>
            <p>Password : {user.password}</p>
            <br />
             {/* <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)}/>
            <label htmlFor="newUser">NewUser Sign In </label><br /><br /> */}
            {/* <form onSubmit ={handleSubmit} >
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='name' required/>} <br/>
                <input type="text" name="email" onBlur={handleBlur} placeholder='email' required/><br />
                <input type="password" name="password" onBlur={handleBlur} placeholder='password' required/><br /><br />
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
            </form>
            <p style={{color:"red"}}>{user.error}</p>
            {user.success && <p style={{color:"green"}}>User {newUser ? "created" : "Logged In" } Successfully.</p>}  */}

            {/* New textfield */}
            <Box component='form' noValidate id='login_form' onSubmit={handleSubmit}>   
                <TextField type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)}/>
                <label htmlFor="newUser">NewUser Sign In </label> <br />
                { newUser && <TextField required normal type='text' name='name' label='Name'onBlur={handleBlur}/>}<br />
                <TextField required normal id='email' name='email' label='Email'onBlur={handleBlur}/><br />
                <TextField required normal id='password' name='password' type='password' label='Password' onBlur={handleBlur}/> 
                <Box>
                    <Button type='submit' variant='contained' style={{marginTop:'10px', marginBottom:'10px', padding: '5x'}} >{newUser ? "Sign Up" : "Sign In"}</Button>
                </Box> <br />
                <NavLink to='/'>Forgot Password ?</NavLink>
                {/* <Alert severity='error'> All Fields are Required </Alert> */}
                {/* <Alert severity='error'>{user.error} </Alert> */}
                {user.success ? <Alert> User {newUser ? "created" : "Logged In" } Successfully.</Alert>: <Alert severity='error'>{user.error}.</Alert>}
                 

            </Box>
        </div>
    );
};

export default Login;