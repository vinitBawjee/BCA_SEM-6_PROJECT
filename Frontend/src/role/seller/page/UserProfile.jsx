import axios from "axios";
import { useState,useEffect } from "react";
import css from "./UserProfile.module.css";
 
const UserProfile = () =>
{


  const API_URL = import.meta.env.VITE_API_URL;

  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
      const id = localStorage.getItem("seller_id"); 
      if (id) {
        fetchuserdata(id);
      } else {
        console.error("No user ID found in localStorage.");
      }
  }, []);

  const fetchuserdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/seller/user/${id}`); 
      setuserdata(response.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div class={`${css['UserProfile']} p-5`}>
      <div className="h-50 w-100 d-flex gap-5">
        <div>
              <img  src={`http://localhost:5000/uploads/seller/${userdata?.image}`} class="img" alt="Profile Picture" className="rounded"  style={{ width: '200px', height: '200px',  }}/>
        </div>
        <div className="w-50">
                <div class="about-text go-to">
                    <h3 class=" mb-4 border-bottom text-muted">{userdata.fullName}</h3>
                    <div class="row about-list">
                        <div class="col-md-6">
                            <div class="media">
                                <label className="">Birthday</label>
                                <p className="">{new Date(userdata.birthdate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div class="media">
                                <label className="">Gender</label>
                                <p className="">{userdata.gender}</p>
                            </div>
                            <div class="media">
                                <label className="">Address </label>
                                <p className=""> {userdata.address}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="media">
                                <label className="">E-mail</label>
                                <p className="">{userdata.email}</p>
                            </div>
                            <div class="media">
                                <label className="">Phone</label>
                                <p className="">{userdata.mobile}</p>
                            </div>
                            <div class="media">
                                <label className="">City</label>
                                <p className="">{userdata.city}</p>
                            </div>
                            <div class="media">
                                <label className="">Pincode</label>
                                <p className="">{userdata.pincode}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;