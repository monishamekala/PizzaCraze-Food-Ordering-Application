import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
    let { userID } = useParams();

    const [currentUser, setUser] = useState([]);
    const [addressList, setAddress] = useState([]);
    const [orderlIST, setorderlIST] = useState([]);
    const navigte = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const urlForuser = `/api/UserController/profile/${userID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlForuser), { withCredentials: true });
                setUser(response.data.user);
                setAddress(response.data.address);
                setorderlIST(response.data.orderItems);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const urlLogout = "/api/UserController/logout"
            const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlLogout), { withCredentials: true });

            if (response.data.Message === "Logged out successfully") {
                // Replace alert with toast.success
                toast.success("Logged out successfully");
                navigte("/");
                window.location.reload();
            } else {
                // Replace alert with toast.error
                toast.error("Error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Hi {currentUser.username}!</h1>
            <h3>Phone Number: {currentUser.phone}</h3>
            <h4>Addresses</h4>
            {addressList.length === 0 ? (
                <p>No addresses added</p>
            ) : (
                <ul>
                    {addressList.map((address) => (
                        <li key={address.addressID}>
                            <p>Address Line 1: {address.line1}</p>
                            <p>Address Line 2: {address.line2}</p>
                            <p>Apt: {address.apt}</p>
                            <p>Zipcode: {address.zipcode}</p>
                            <p>Added On: {new Date(address.addedOn).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
            <h5>Order history</h5>
            <button type='button' className="btn btn-primary" onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    )
}

export default ProfilePage;
