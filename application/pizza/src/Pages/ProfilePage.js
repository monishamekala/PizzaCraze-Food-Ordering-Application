import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    let { userID } = useParams();

    const [currentUser, setUser] = useState( [] );

    const navigte = useNavigate();

    useEffect(() => {
        const fetchUser = async() =>{
            try{
                const urlForuser = `/api/UserController/profile/${userID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlForuser), {withCredentials:true});
                setUser(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [userID]);

    const handleLogout = async e => {
        e.preventDefault()
        try{
            const urlLogout = "/api/UserController/logout"
            const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlLogout), {withCredentials: true});
            
            if (response.data.Message === "Logged out successfully") {
                navigte("/");
                window.location.reload();
            }else{
                alert("Error");
            }
        }
        catch(err){
            console.log(err);
        }
    }; 

    return(
        <div>
            <h1>Hi {currentUser.username}!</h1>
            <h2>Your Password: {currentUser.password}</h2>
            <h3>Phone Number: {currentUser.phone}</h3>
            <h4>Addresses</h4>
            <h5>Order history</h5>

            <button type='button' className = "btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ProfilePage