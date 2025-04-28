import css from "./Seller_Account.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Seller_Account = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [sellerdata, setsellerdata] = useState([]);
    const [msg, setmsg] = useState(false);
  
    const fetchsellerdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/seller-account`);
        const formattedData = response.data.map(user => ({
            ...user,
            birthdate: new Date(user.birthdate).toLocaleDateString("en-GB"), 
        }));
        setsellerdata(formattedData);
      } catch (error) {
        console.error("Error fetching Auction data:", error);
        setmsg(true);
      }
    };

    useEffect(() => {
      fetchsellerdata();
    }, []);
  
    const handleDelete = async (pid) => {
      if (!window.confirm(`Are you sure you want to delete this seller account?`)) return;
      try {
        await axios.delete(`${API_URL}/admin/seller-account/${pid}`);
        fetchsellerdata();
      } catch (error) {
        console.error("Error deleting Auction:", error);
      }
    };
  
    return (
      <div className="p-5">
        <h3 className='text-start w-100 mb-4 border-bottom' style={{color: "#4A90E2"}}>Seller Account</h3>
        <div className={css['auction-table']}>
          <table className="w-100">
            <thead className="border" style={{height: "50px"}}>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Image</th>
              <th className="text-center">Full Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Mobile</th>
              <th className="text-center">Address</th>
              <th className="text-center">City</th>
              <th className="text-center">Pincode</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Birthdate</th>
              <th className="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
              {msg ? (
                <tr> <td colSpan="9" className={`text-secondary text-center ${css.noDataMessage}`}> Seller not found </td> </tr>
              ) : (
              sellerdata.map((item, index) => {
                return (
                  <tr key={item._id} className="border-top mt-5">
                    <td className="text-secondary text-center">{index+1}</td>
                    <td className="text-secondary text-center"><img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction Image" style={{ width: "80px", height: "80px", padding: "7px" }}/></td>
                    <td className="text-secondary text-center">{item.fullName}</td>
                    <td className="text-secondary text-center">{item.email}</td>
                    <td className="text-secondary text-center">{item.mobile}</td>
                    <td className="text-secondary text-center">{item.address}</td>
                    <td className="text-secondary text-center">{item.city}</td>
                    <td className="text-secondary text-center">{item.pincode}</td>
                    <td className="text-secondary text-center">{item.gender}</td>
                    <td className="text-secondary text-center">{item.birthdate}</td>
                    <td>
                      <input type="submit" value="Delete" className={`${css.deleteButton} w-75 btn btn-outline-danger`}
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </div>
    );  
}

export default Seller_Account