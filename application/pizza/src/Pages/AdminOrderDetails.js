import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/AdminLogin.css';

function AdminOrderDetails(){
    let {orderID} = useParams();
    const [orders, setorderdetails] = useState([]);

    useEffect(() => {
        const getOrderDetails = async() => {
            try{
                const urlgetOrderDetails = `/api/AdminController/get-order-details/${orderID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlgetOrderDetails), {withCredentials: true});

                setorderdetails(response.data);

            }catch(err){

            }
        }
        getOrderDetails();
    }, []);
    return(
        <div className="orderdetail-tableContainer">
            <table className="orderdetail-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Address ID</th>
                        <th>Address</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>CART ID</th>
                        <th>Cheese_level</th>
                        <th>sauce_level</th>
                        <th>meat_level</th>
                        <th>spice_level</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.UserName}</td>
                        <td>{order.addressID}</td>
                        <td>{`${order.line1}, ${order.line2}, ${order.apt}, ${order.zipcode}`}</td>
                        <td>{order.Item}</td>
                        <td>{order.Price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.cartID}</td>
                        <td>{order.cheese_level}</td>
                        <td>{order.sauce_level}</td>
                        <td>{order.meat_level}</td>
                        <td>{order.spice_level}</td>
                    </tr>
                    ))}
                </tbody>
            </table>  

            <div class="custom-select-container">
                <label htmlFor="status">Change Status: </label>
                <select id="status" class="custom-select">
                    <option value="waiting">Waiting for confirmation</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Preparing your food</option>
                    <option value="delivered">On its way</option>
                    <option value="delivered">Delivered</option>
                </select>
                <div class="dropdown-icon">&#9660;</div>
            </div>

        </div>
    )
}

export default AdminOrderDetails;