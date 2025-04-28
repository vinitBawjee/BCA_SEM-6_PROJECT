import axios from "axios";
import { useState,useEffect } from "react";
import css from "./UserProfile.module.css";
 
const UserProfile = () =>
{


  const API_URL = import.meta.env.VITE_API_URL;

  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
      const id = localStorage.getItem("user_id"); 
      if (id) {
        fetchuserdata(id);
      } else {
        console.error("No user ID found in localStorage.");
      }
  }, []);

  const fetchuserdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/user/${id}`); 
      setuserdata(response.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div class={`${css['UserProfile']} d-flex gap-5`}>
            <div>
                <img  src={`http://localhost:5000/uploads/user/${userdata?.image}`} class="img" alt="Profile Picture" className=" rounded"  style={{ width: '400px', height: 'auto' }}/>
            </div>
            <div className="w-100">
                <div class="about-text go-to">
                    <h3 class="dark-color">{userdata.fullName}</h3>
                    <div class="row about-list">
                        <div class="col-md-6">
                            <div class="media">
                                <label>Birthday</label>
                                <p>{new Date(userdata.birthdate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div class="media">
                                <label>Gender</label>
                                <p>{userdata.gender}</p>
                            </div>
                            <div class="media">
                                <label>Address </label>
                                <p> {userdata.address}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="media">
                                <label>E-mail</label>
                                <p>{userdata.email}</p>
                            </div>
                            <div class="media">
                                <label>Phone</label>
                                <p>{userdata.mobile}</p>
                            </div>
                            <div class="media">
                                <label>City</label>
                                <p>{userdata.city}</p>
                            </div>
                            <div class="media">
                                <label>Pincode</label>
                                <p>{userdata.pincode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
};

export default UserProfile;