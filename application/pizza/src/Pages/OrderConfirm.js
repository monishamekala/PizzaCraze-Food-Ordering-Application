import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import BannerImage from '../Assests/12.png';

function OrderConfirm(){

    const [auth, setAuth] = useState(false);
    const [userID, setUserID] = useState(null);

    const lookForAuth = async () => {
        try{
          const urlCurrentUser = "/api/UserController/CurrentUser";
          const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
          if (response.data.Status === "Success"){
            //if the token is created (i.e., user is autherised then set auth to true)
            setAuth(true);
            setUserID(response.data.userID);
          }
        }catch(err){
          console.error(err);
        }
      };
    
    useEffect(() => {
    lookForAuth();
    }, []);

    return(
        <div>
            {auth ? 
                <div>
                    <h1>Order confirmed</h1> 
                    <Confetti 
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={150}
                    recycle={false}
                    />
                    <div>
                      <img src={BannerImage} height={250} style={{margin: 50}}></img>
                      <br></br>
                      <a href={BannerImage} download="React Image" className='btn' style={{fontSize: 30}}>Download</a>
      
    </div>
                </div>
            : <h1>Please log in</h1>}
        </div>
    )
}

export default OrderConfirm;