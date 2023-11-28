import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
    let { userID } = useParams();
    const navigate = useNavigate();

    const [currentUser, setUser] = useState([]);
    const [addressList, setAddress] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const urlForUser = `/api/UserController/profile/${userID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlForUser), { withCredentials: true });
                setUser(response.data.user);
                setAddress(response.data.address);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchOrders = async () => {
            try {
                const urlForOrders = `/api/order/get-orders/${userID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlForOrders), { withCredentials: true });
                setOrderList(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
        fetchOrders();
    }, [userID]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const urlLogout = "/api/UserController/logout";
            const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlLogout), { withCredentials: true });

            if (response.data.Message === "Logged out successfully") {
                toast.success("Logged out successfully");
                navigate("/");
                window.location.reload();
            } else {
                toast.error("Error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOrderChange = (e) => {
        const selectedOrderID = e.target.value;
        const selectedOrderData = orderList.find((order) => order.orderID === selectedOrderID);
        setSelectedOrder(selectedOrderData);
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

            <select onChange={handleOrderChange}>
                <option value="">Select an order</option>
                {orderList.map((order) => (
                    <option key={order.orderID} value={order.orderID}>
                        {`Order ID: ${order.orderID} - Order Date: ${new Date(order.order_date).toLocaleString()}`}
                    </option>
                ))}
            </select>

            {selectedOrder && (
                <div>
                    <h6>Details for selected order (Order ID: {selectedOrder.orderID}):</h6>
                    <ul>
                        <li>Address: {selectedOrder.order_addressID}</li>
                        <li>Payment Method: {selectedOrder.paymethod}</li>
                        <li>Order Date: {new Date(selectedOrder.order_date).toLocaleString()}</li>
                        <li>Order Status: {selectedOrder.order_status}</li>
                        <li>Cart Items:</li>
                        <ul>
                            {selectedOrder.cartItems.map((cartItem) => (
                                <li key={cartItem.cart_itemID}>
                                    {`Menu Name: ${cartItem.MenuName}, Quantity: ${cartItem.quantity}`}
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            )}

            <button type='button' className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
            <ToastContainer />
        </div>
    );
}

export default ProfilePage;
